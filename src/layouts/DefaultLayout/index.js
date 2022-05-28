import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from 'layouts/Header/index'
import Footer from 'layouts/Footer/index'
import './style.css';

function DefaultLayout({ children, isHeader, isFooter }) {
	const location = useLocation();
	return (
		<div>
			{isHeader === 1 && (
				<Header />
			)}
			<div
				className={location.pathname.includes('me') === true ? "wrapper-big-profile-main" : "wrapper-main"}
				style={{ margin: isHeader === 0 && "0", minHeight: isHeader === 0 && "calc(100vh - 70px)" }}
			>
				<div className={"container"}>
					{children}
				</div>
			</div>
			{isFooter === 1 && (
				<Footer />
			)}
		</div>
	)
}

export default DefaultLayout