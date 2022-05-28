import React from 'react'
import { Link } from 'react-router-dom';
import { IconThreeDots } from 'assets/index';

function ItemPost({ id, title, time, timeRead }) {
	return (
		<div className='my-blog-item'>
			<div className='d-flex justify-content-space-between my-blog-item-head'>
				<Link to={`/blog/edit/${id}`} className="my-blog-item-left">
					<h3 className='my-blog-title line-clamp-two'>{title}</h3>
				</Link>
				<IconThreeDots />
			</div>
			<div className='my-blog-author'>
				<Link to={`/blog/edit/${id}`}>
					Chỉnh sửa {time}
				</Link>
				<span>{timeRead} phút đọc</span>
			</div>
		</div>
	)
}

export default ItemPost