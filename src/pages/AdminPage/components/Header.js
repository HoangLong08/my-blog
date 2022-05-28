import React from 'react'
import "./style.css"

function Header({ left, right, className }) {
	return (
		<div className={className + ' d-flex align-items-center justify-content-space-between admin-page-header'}>
			<div className="admin-header-title">
				{left}
			</div>
			<div>
				{right}
			</div>
		</div>
	)
}

export default Header