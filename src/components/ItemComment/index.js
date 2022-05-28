import React, { useState } from 'react'
import { Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IconThreeDots, ImageAngry, ImageHeart, ImageLike, ImageSad, ImageSmile, ImageSurprise } from 'assets/index';
import PopoverComponent from 'components/Popover/index'
import { formatDistance } from "date-fns";
import { useSelector } from 'react-redux';
import vi from 'date-fns/locale/vi'
import { getDetailCommentApi, deleteCommentApi } from 'api/comment'
import InputComment from 'pages/DetailPage/InputComment';
import { isEmpty } from "lodash"
import { useDispatch } from 'react-redux';
import "./style.css"

function ItemComment({ idPost, idComment, idUser, avatar, name, content, emoji, time }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authSlice = useSelector((state) => state.authSlice);
	const [isReplyComment, setIsReplyComment] = useState('')
	const [valueComment, setValueComment] = useState('')

	const durationTime = (time) =>
		time &&
		`${formatDistance(new Date(), new Date(time), {
			includeSeconds: true,
			locale: vi
		})} trước`;

	const handleEditComment = (_idComment) => async () => {
		const getDetailComment = await getDetailCommentApi(_idComment);
		await setValueComment(getDetailComment);
		await setIsReplyComment(_idComment)
	}

	const handleCancelReply = () => {
		setIsReplyComment('')
	}

	const handleDeleteComment = (_idComment) => async () => {
		await deleteCommentApi(_idComment);
	}

	const createMarkup = _des => {
		return { __html: _des };
	};

	const handleReport = async () => {
		if (!isEmpty(authSlice.data)) {
			// await dispatch(
			// 	addReportAction({
			// 		idPost,
			// 		idComment
			// 	}));
		} else {
			navigate('/dang-nhap');
		}
	}

	return (
		<>
			<div className='wrapper-item-comment'>
				<div className='wrapper-item-img-comment'>
					<img src={avatar} alt={name} />
				</div>
				<div className='wrapper-item-body-comment'>
					<div className='item-content-comment'>
						<h5 className='item-name-comment'>{name}</h5>
						<div className='item-text-comment' dangerouslySetInnerHTML={createMarkup(content)} />
					</div>
					<div className='item-action-comment'>
						<Popover
							placement="topLeft"
							mouseLeaveDelay={0.5}
							content={
								<div className='d-flex align-items-center gap-16'>
									<div className='status-icon-comment'>
										<img src={ImageLike} alt="like" />
									</div>
									<div className='status-icon-comment'>
										<img src={ImageHeart} alt="heart" />
									</div>
									<div className='status-icon-comment'>
										<img src={ImageSmile} alt="smile" />
									</div>
									<div className='status-icon-comment'>
										<img src={ImageSurprise} alt="wow" />
									</div>
									<div className='status-icon-comment'>
										<img src={ImageSad} alt="sad" />
									</div>
									<div className='status-icon-comment'>
										<img src={ImageAngry} alt="angry" />
									</div>
								</div>
							}
						>
							<span className='item-action-icon'>{emoji}</span>
						</Popover>
						<span className='item-action-icon'>Trả lời</span>
						<span className='item-action-icon'>{durationTime(time * 1000)}</span>
						<span className='item-action-icon item-three-dots wrapper-popover'>
							<IconThreeDots />
							<PopoverComponent
								content={
									<>
										{authSlice.data?.idUser === idUser ? (
											<>
												<div className='item-popover' onClick={handleEditComment(idComment)}>
													Sửa bình luận
												</div>
												<div className='item-popover' onClick={handleDeleteComment(idComment)}>
													Xóa bình luận
												</div>
											</>
										) : (
											<div className='item-popover' onClick={handleReport}>
												Báo cáo bình luận
											</div>
										)}
									</>
								} />
						</span>
					</div>
					{!isEmpty(isReplyComment) && (
						<div className='rep-comment'>
							<InputComment idComment={idComment} value={valueComment.content} handleCancelReply={handleCancelReply} type="edit" />
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default ItemComment