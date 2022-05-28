import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Row, Col } from 'antd';
import ContentEditable from 'react-contenteditable'
import { isEmpty } from "lodash"
import { addCommentApi, updateCommentApi } from "api/comment"
import { useEffect } from 'react';

function InputComment({ idPost, idComment, value, handleCancelReply, type }) {
	const authSlice = useSelector((state) => state.authSlice);
	const [contentComment, setContentComment] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!isEmpty(type)) {
			setContentComment(value)
		}
	}, [type, value])

	const handleChange = (e) => {
		setContentComment(e.target.value.trim())
	}

	const handleComment = async () => {
		await setLoading(true);
		await setContentComment("");
		if (!isEmpty(type)) {
			await updateCommentApi(idComment, contentComment)
		} else {
			await addCommentApi(idPost, authSlice.data.idUser, contentComment)
		}
		await setLoading(false);
	}

	return (
		<>{!isEmpty(authSlice.data) ? (
			<div>
				<div className='comment-box-comment-wrapper d-flex'>
					<img src={authSlice.data?.avatarUser} alt="avatar" />
					<ContentEditable
						spellCheck="false"
						className="comment-input"
						html={contentComment}
						onChange={handleChange}
						disabled={false}
						placeholder="Viết bình luận của bạn"
						tagName='div'
					/>
				</div>
				<Row justify="end">
					<Col span={3}>
						<Button
							onClick={() => {
								if (!isEmpty(type)) {
									handleCancelReply()
								} else {
									setContentComment('')
								}
							}}
						>
							Hủy
						</Button>
					</Col>
					<Col span={4}>
						<Button type="primary" disabled={contentComment.length === 0} onClick={handleComment} loading={loading}>
							{!isEmpty(type) ? "Cập nhật" : "Bình luận"}
						</Button>
					</Col>
				</Row>
			</div>

		) : (
			<></>
		)}
		</>
	)
}

export default InputComment