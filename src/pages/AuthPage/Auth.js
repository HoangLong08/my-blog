import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Tabs } from 'antd';
import FormAuth from './FormAuth';

const { TabPane } = Tabs;

function Auth() {
	const location = useLocation();
	const navigate = useNavigate();
	const [tabKey, setTabKey] = useState("1");

	const pathUrl = location && location.pathname;
	useEffect(() => {
		if (pathUrl === "/dang-nhap") {
			setTabKey("1")
		} else {
			setTabKey("2")
		}
	}, [pathUrl])

	const callback = (key) => {
		setTabKey(key)
		if (key === "2") {
			navigate('/dang-ky')
		} else {
			navigate('/dang-nhap')
		}
	}

	return (
		<div className="wrapper-auth">
			<div className='auth-header'>
				<Link to="/">
					<h1 className='title-logo'>My Blog</h1>
				</Link>
				<p>Nơi chia sẻ kiến ​​thức và hiểu rõ hơn về thế giới</p>
			</div>
			<div>
				<Tabs activeKey={tabKey} onChange={callback}>
					<TabPane tab="Đăng nhập" key={"1"}>
						<FormAuth />
					</TabPane>
					<TabPane tab="Đăng ký" key={"2"}>
						<FormAuth type="register" />
					</TabPane>
				</Tabs>
			</div>
		</div>
	)
}

export default Auth