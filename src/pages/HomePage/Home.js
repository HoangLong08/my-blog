import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IconSearch } from 'assets'
import { Input } from 'antd'
import { getListPostAction } from 'store/post/actions';
import { nanoid } from 'nanoid';
import ItemPostLoading from './ItemPostLoading';
import ItemPost from './ItemPost';
import "./style.css";
import NoData from 'components/NoData/index';

function Home() {
	const dispatch = useDispatch();
	const listPost = useSelector((state) => state.postSlice.listPost);

	useEffect(() => {
		dispatch(getListPostAction({ role: "" }));
	}, [dispatch])

	return (
		<div className="wrapper-home">
			<div className="home-top">
				<div />
				<div className="wrapper-home-input">
					<Input size="large" placeholder="Tìm kiếm" prefix={<IconSearch />} />
				</div>
			</div>
			<div className="home-bottom">
				<div className="wrapper-home-list-post">
					{listPost.load && (
						<>
							<ItemPostLoading />
							<ItemPostLoading />
							<ItemPostLoading />
							<ItemPostLoading />
							<ItemPostLoading />
							<ItemPostLoading />
						</>
					)}
					{!listPost.load && (
						listPost.data.map(item => (
							<ItemPost key={nanoid()}
								idPost={item.id}
								titlePost={item.title}
								thumbnailPost={item.thumbnail}
								avatarAuthor={item.avatar}
								nameAuthor={item.fullName}
								timeRead={item.timeRead}
							/>
						))
					)}
					{!listPost.load && listPost.data?.length === 0 && (
						<NoData des="Hiện tại chưa có bài viết nào." />
					)}
				</div>
			</div>
		</div >
	)
}

export default Home