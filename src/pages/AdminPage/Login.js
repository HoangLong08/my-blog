import React from 'react'
import FormAuth from "pages/AuthPage/FormAuth"
import "./style.css"

function Login() {
	return (
		<div className='wrapper-admin-auth'>
			<div className="content-admin-auth">
				<FormAuth type="admin" />
			</div>
		</div>
	)
}

export default Login