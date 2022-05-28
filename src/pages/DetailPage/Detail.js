import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from "react-router-dom";
import { getDetailPostAction, getListPostByAuthorAction } from 'store/post/actions';
import { Row, Col, Space, Skeleton } from 'antd';
import { IconComment, IconHeartNoActive, IconThreeDots } from 'assets/index';
import { formatDistance } from "date-fns";
import { isEmpty } from 'lodash'
import vi from 'date-fns/locale/vi'
import ModalComment from './ModalComment';
import useOnSnapshot from 'hooks/useOnSnapshot';
import {
	collection,
	query,
	where,
	orderBy
} from "firebase/firestore";
import { db } from "firebaseConfig";
import { nanoid } from 'nanoid';
import './style.css';
import removeVietnameseTones from 'utils/removeVietnameseTones';

function Detail() {
	const { idPost } = useParams();
	const dispatch = useDispatch();
	const detailPost = useSelector((state) => state.postSlice.detailPost);
	const listPostByAuthor = useSelector((state) => state.postSlice.listPostByAuthor);
	const [listComment, setListComment] = useState([]);
	const [valueDetail, setValueDetail] = useState({
		avatar: "",
		description: "",
		fullName: "",
		idCategory: "",
		idUser: "",
		listComment: "",
		thumbnail: "",
		timeRead: "",
		title: "",
		updatedAt: "",
	})

	const [loadingDivComment, setLoadDivComment] = useState(false)
	const [checkShowModalComment, setCheckShowModalComment] = useState(true);

	useEffect(() => {
		dispatch(getDetailPostAction({ idPost: idPost }));
		setLoadDivComment(false);
	}, [dispatch, idPost])

	useEffect(() => {
		if (!isEmpty(detailPost.data)) {
			setValueDetail({
				avatar: detailPost.data.avatar,
				description: detailPost.data.description,
				fullName: detailPost.data.fullName,
				idCategory: detailPost.data.idCategory,
				idUser: detailPost.data.idUser,
				listComment: detailPost.data.listComment,
				thumbnail: detailPost.data.thumbnail,
				timeRead: detailPost.data.timeRead,
				title: detailPost.data.title,
				updatedAt: detailPost.data.updatedAt,
			});
			dispatch(getListPostByAuthorAction({
				idUser: detailPost.data.idUser || 0,
				limit: 5
			}))
		}
	}, [detailPost.data, dispatch])

	const createMarkup = _des => {
		return { __html: _des };
	};

	const durationTime = (time) =>
		time &&
		`${formatDistance(new Date(), new Date(time), {
			includeSeconds: true,
			locale: vi
		})} trước`;

	const queryComment = query(
		collection(db, "comments"),
		where("idPost", "==", idPost),
		orderBy("updatedAt", "desc")
	);

	const queryUser = collection(db, "users");
	const dataComment = useOnSnapshot(queryComment, idPost);
	const dataUser = useOnSnapshot(queryUser);

	useEffect(() => {
		const resArr = [];
		dataComment.forEach((itemComment) => {
			let newObj = {}
			dataUser.forEach(itemUser => {
				if (itemComment.idUser.trim() === itemUser.id.trim()) {
					newObj = {
						idComment: itemComment.id,
						...itemComment,
						...itemUser
					}
				}
			})
			resArr.push(newObj);
		})
		setListComment(resArr);
	}, [dataComment, dataUser, idPost])

	return (
		<div className="wrapper-detail">
			<Row gutter={[16, 16]}>
				<Col xs={6} sm={6} md={6} lg={6}>
					<div className="detail-blog-left">
						{detailPost.load && (
							<Skeleton.Input active={true} size='small' />
						)}
						{!detailPost.load && (
							<h4 className="detail-blog-name-author">{valueDetail.fullName}</h4>
						)}
						<hr />
						<Space size="large">
							<div className=" detail-blog-icon">
								<IconHeartNoActive />
								<p>123</p>
							</div>
							<div
								className="detail-blog-icon"
								onClick={async () => {
									await setLoadDivComment(true);
									await setCheckShowModalComment(!checkShowModalComment)
								}}
								aria-hidden="true"
							>
								<IconComment />
								<p>{listComment.length}</p>
							</div>
						</Space>
					</div>
				</Col>
				<Col xs={16} sm={16} md={16} lg={16}>
					{detailPost.load && (
						<Skeleton paragraph={{ rows: 30 }} />
					)}
					{!detailPost.load && (
						<>
							<h1 className="detail-blog-title">
								{valueDetail.title}
							</h1>
							<div className="detail-blog-header">
								<div className="detail-blog-header-info">
									<img className="detail-blog-info-image" src={valueDetail.avatar} alt={valueDetail.fullName} />
									<div>
										<p className="detail-blog-info-name">{valueDetail.fullName}</p>
										<div className="wrapper-form-action">
											<p>{valueDetail?.updatedAt && durationTime(valueDetail?.updatedAt?.seconds * 1000)}</p>
											<p>{valueDetail.timeRead} phút đọc</p>
										</div>
									</div>
								</div>
								<div className="detail-blog-header-action">
									<IconThreeDots />
								</div>
							</div>
							<div className="detail-blog-banner">
								<img src={valueDetail.thumbnail} alt={valueDetail.title} />
							</div>
							<div className="detail-blog-des" dangerouslySetInnerHTML={createMarkup(valueDetail.description)} />
							<h3 className="blog-same-author">
								Bài đăng cùng tác giả
							</h3>
							{
								listPostByAuthor.data.length > 0 && (
									listPostByAuthor.data.map((item, index) => {
										const convertNoTone = removeVietnameseTones(item.title);
										if (item.id !== idPost) {
											return (
												<div className='item-blog-same-author' key={nanoid()}>
													<Link to={`/blog/${convertNoTone}/${item.id}`}>
														- {item.title}
													</Link>
												</div>
											)
										} else {
											return null
										}
									})
								)
							}
							{
								listPostByAuthor.data.length === 0 && (
									<p>Tác giả chưa có bài đăng nào khác.</p>
								)
							}
						</>
					)}
				</Col>
				<Col xs={2} sm={2} md={2} lg={2}></Col>
			</Row>
			{loadingDivComment && (
				<div
					id='wrapper-container-comment'
					className={`wrapper-container-comment${checkShowModalComment ? ' content-container-closing ' : ''}`}
					onClick={() => {
						setCheckShowModalComment(!checkShowModalComment)
					}} aria-hidden="true"
				>
					<ModalComment handleClose={() => setCheckShowModalComment(!checkShowModalComment)} listComment={listComment} idPost={idPost} />
				</div>
			)}
		</div>
	)
}

export default Detail