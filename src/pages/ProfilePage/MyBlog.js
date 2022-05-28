import React from 'react'
import { Tabs, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListPostByAuthorAction } from 'store/post/actions';
import { nanoid } from 'nanoid';
import { formatDistance } from "date-fns";
import vi from 'date-fns/locale/vi'
import ItemPost from './ItemPost';

const { TabPane } = Tabs;

function MyBlog() {
	const dispatch = useDispatch();
	const listPostByAuthor = useSelector((state) => state.postSlice.listPostByAuthor);
	const authSlice = useSelector((state) => state.authSlice);

	useEffect(() => {
		dispatch(getListPostByAuthorAction({
			idUser: authSlice.data.idUser
		}))
	}, [dispatch, authSlice.data])

	const durationTime = (time) =>
		time &&
		`${formatDistance(new Date(), new Date(time), {
			includeSeconds: true,
			locale: vi
		})} trước`;

	return (
		<div>
			<Tabs defaultActiveKey="1" size={"large"}>
				<TabPane tab="Đã xuất bản" key="1">
					{listPostByAuthor.load && (
						<div className='d-flex align-items-center justify-content-center'>
							<Spin size="large" />
						</div>
					)}
					{!listPostByAuthor.load && (
						listPostByAuthor.data?.map(item => (
							<ItemPost
								key={nanoid()}
								id={item.id}
								title={item.title}
								time={item?.updatedAt && durationTime(item?.updatedAt?.seconds * 1000)}
								timeRead={item.timeRead}
							/>
						))
					)}
					{!listPostByAuthor.load && listPostByAuthor.data.length === 0 && (
						<>
							<h1>Chưa có bài viết nào.</h1>
							<p>
								Bạn có thể {" "}
								<Link to="/bai-viet-moi">
									tạo viết mới
								</Link>
							</p>
						</>
					)}
				</TabPane>
				<TabPane tab="Bản nháp" key="2">
					Đang update
				</TabPane>
			</Tabs>
		</div>
	)
}

export default MyBlog