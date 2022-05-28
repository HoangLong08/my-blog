import React, { memo } from 'react'
import {
	CloseCircleOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import ItemComment from 'components/ItemComment/index';
import { nanoid } from 'nanoid';

import "./styleModalComment.css";
import InputComment from './InputComment';

function ModalComment({ handleClose, listComment, idPost }) {
	const handleChildElementClick = (e) => {
		e.stopPropagation()
		// Do other stuff here
	}

	return (
		<>
			<div className="content-container-comment" onClick={(e) => handleChildElementClick(e)}>
				<div className='body-comment-blog'>
					<div className='wrapper-button-close-comment'>
						<Button shape="circle" icon={<CloseCircleOutlined />} onClick={handleClose} />
					</div>
					<div className='content-comment-heading'>
						<h4>{listComment.length === 0 ? "Chưa có" : listComment.length} bình luận</h4>
						<p className='comment-help'>(Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé)</p>
					</div>
					<InputComment idPost={idPost} />
					<div className='customize-scroll wrapper-list-comment'>
						{listComment?.map(item => (
							<ItemComment
								key={nanoid()}
								idPost={idPost}
								avatar={item.avatar}
								name={item.fullName}
								content={item.content}
								emoji={item.emoji}
								time={item.updatedAt?.seconds}
								idUser={item.idUser}
								idComment={item.idComment}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default memo(ModalComment)