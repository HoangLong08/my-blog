import React from 'react'
import Sidebar from 'layouts/Sidebar/index'
import "./style.css"

function LayoutProfile({ children }) {
	return (
		<div className='wrapper-profile-main'>
			<Sidebar type="user" />
			<div className='customize-scroll wrapper-profile-box'>
				{children}
			</div>
		</div>
	)
}

export default LayoutProfile