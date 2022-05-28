import { IconThreeDots } from 'assets/index'
import PopoverComponent from 'components/Popover/index'
import React from 'react'

function ItemCategory({ title, isActive, numberPosts, onClickEdit, onClickDelete }) {
	return (
		<div className='wrapper-item-category'>
			<div className='d-flex justify-content-space-between'>
				<p className='item-category-title line-clamp-two'>{title}</p>
				<div className='item-category-icon d-flex wrapper-popover'>
					<IconThreeDots />
					<PopoverComponent
						content={
							<>
								<div className='item-popover'>
									Khóa
								</div>
								<div className='item-popover' onClick={onClickEdit}>
									Chỉnh sửa
								</div>
								<div className='item-popover' onClick={onClickDelete}>
									Xóa tag
								</div>
							</>
						}
					/>
				</div>
			</div>
			<div className='d-flex justify-content-space-between align-items-center' style={{ marginTop: "6px" }}>
				<p className='item-category-number-post'>{numberPosts} bài viết</p>
				{isActive && (
					<p className={isActive ? 'item-category-no-block item-category-status d-flex justify-content-space-between align-items-center' : 'item-category-block item-category-status d-flex justify-content-space-between align-items-center'}> <span /> {isActive ? "active" : "no active"}</p>
				)}
			</div>
		</div>
	)
}

export default ItemCategory