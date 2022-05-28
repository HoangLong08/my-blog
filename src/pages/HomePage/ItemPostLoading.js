import React from 'react'
import { Skeleton } from 'antd';
function ItemPostLoading() {
	return (
		<div className="wrapper-home-item">
			<Skeleton.Image className="home-item-loading" />
			<h3 className="home-item-title line-clamp-one">
				<Skeleton.Input active={true} size='small' />
			</h3>
			<div className="wrapper-form-action">
				<div className='d-flex align-items-center gap-16'>
					<Skeleton.Avatar active={true} size={"small"} shape={"circle"} />
					<Skeleton.Input active={true} size='small' />
				</div>
				<div className="home-item-name-author">
					<Skeleton.Input active={true} size='small' />
				</div>
			</div>
		</div>
	)
}

export default ItemPostLoading