import React from 'react'
import Sidebar from 'layouts/Sidebar/index'
import Header from 'layouts/Header/index'
import "./style.css"

function LayoutAdmin({ path, children }) {
	return (
		<>
			<Header />
			<div className="wrapper-admin-main">
				<Sidebar />
				<div className={path.includes('tong-quan') === true || path.includes('category') === true ? 'customize-scroll wrapper-admin-box' : 'customize-scroll wrapper-admin-box admin-box'}>
					{children}
				</div>
			</div>
		</>
	)
}

export default LayoutAdmin