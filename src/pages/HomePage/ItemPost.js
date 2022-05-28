import React from 'react'
import { Link } from 'react-router-dom'
import removeVietnameseTones from 'utils/removeVietnameseTones'

function ItemPost({ idPost, titlePost, thumbnailPost, avatarAuthor, nameAuthor, timeRead }) {
	const convertNoTone = removeVietnameseTones(titlePost);
	return (
		<div className="wrapper-home-item">
			<Link to={`/blog/${convertNoTone}/${idPost}`}>
				<img className="home-item-image" src={thumbnailPost} alt={titlePost} />
			</Link>
			<Link to={`/blog/${convertNoTone}/${idPost}`}>
				<h3 className="home-item-title line-clamp-one">{titlePost}</h3>
			</Link>
			<div className="wrapper-form-action">
				<div className='d-flex align-items-center' style={{ width: "175px" }}>
					<img className="home-item-avatar" src={avatarAuthor} alt={nameAuthor} />
					<span className="home-item-name-author line-clamp-one">{nameAuthor}</span>
				</div>
				<p className="home-item-time-read">{timeRead} phút đọc</p>
			</div>
		</div>
	)
}

export default ItemPost