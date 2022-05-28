import React, { useEffect, useState } from 'react'
import { Space, Button, Popover } from 'antd'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from "lodash";
import { IconBell } from 'assets/index';
import { logoutAction } from 'store/auth/actions';
import { useDispatch } from '../../../node_modules/react-redux/es/exports';
import { setInfoUser } from 'store/auth/reducers';
import "./style.css"

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const authSlice = useSelector((state) => state.authSlice);
	const [checkUrl, setCheckUrl] = useState(false);
	const pathUrl = location && location.pathname;

	useEffect(() => {
		if (pathUrl.includes('admin')) {
			setCheckUrl(true);
		} else {
			setCheckUrl(false);
		}
	}, [pathUrl])

	const handleRedirectUrl = (_url) => () => {
		navigate(_url);
	};

	const logout = async () => {
		const res = await dispatch(logoutAction());
		if (res.payload.type === "success") {
			dispatch(setInfoUser({}));
			navigate("/");
		}
	}

	return (
		<div className="wrapper-header">
			<div className={!checkUrl ? 'container' : 'header-admin'}>
				<div className="content-header">
					<div className="left-header">
						<Link to="/">
							<h1 className='title-logo'>My Blog</h1>
						</Link>
					</div>
					<div className="right-header">
						{!isEmpty(authSlice.data) && (
							<Space size="middle">
								<Popover
									overlayClassName="wrapper-popover"
									placement="bottomRight"
									// title={ }
									content={
										<div className='wrapper-box-notify'>
											<div className='header-notify'>
												<p className='title-notify'>Thông báo</p>
											</div>
											<div className='main-notify customize-scroll'>
												<div className='item-notify'>
													<div className='item-notify-left'>
														<img src='https://lh3.googleusercontent.com/a/AATXAJxvpBWun5zQgjfm3xXe2Sw7E_rATjUx-BGsalxF=s96-c' alt='avatar' />
													</div>
													<div className='item-notify-right'>
														<p className='item-notify-content line-clamp-two'>Hoang Long Hoang Long Hoang Long Hoang Long Hoang Long alo alo</p>
														<p className='item-notify-time'> 5 thang truoc</p>
													</div>
												</div>
												<div className='item-notify'>
													<div className='item-notify-left'>
														<img src='https://lh3.googleusercontent.com/a/AATXAJxvpBWun5zQgjfm3xXe2Sw7E_rATjUx-BGsalxF=s96-c' alt='avatar' />
													</div>
													<div className='item-notify-right'>
														<p className='item-notify-content line-clamp-two'>Hoang Long Hoang Long Hoang Long Hoang Long Hoang Long alo alo</p>
														<p className='item-notify-time'> 5 thang truoc</p>
													</div>
												</div>
												<div className='item-notify'>
													<div className='item-notify-left'>
														<img src='https://lh3.googleusercontent.com/a/AATXAJxvpBWun5zQgjfm3xXe2Sw7E_rATjUx-BGsalxF=s96-c' alt='avatar' />
													</div>
													<div className='item-notify-right'>
														<p className='item-notify-content line-clamp-two'>Hoang Long Hoang Long Hoang Long Hoang Long Hoang Long alo alo</p>
														<p className='item-notify-time'> 5 thang truoc</p>
													</div>
												</div>
												<div className='item-notify'>
													<div className='item-notify-left'>
														<img src='https://lh3.googleusercontent.com/a/AATXAJxvpBWun5zQgjfm3xXe2Sw7E_rATjUx-BGsalxF=s96-c' alt='avatar' />
													</div>
													<div className='item-notify-right'>
														<p className='item-notify-content line-clamp-two'>Hoang Long Hoang Long Hoang Long Hoang Long Hoang Long alo alo</p>
														<p className='item-notify-time'> 5 thang truoc</p>
													</div>
												</div>
												<div className='item-notify'>
													<div className='item-notify-left'>
														<img src='https://lh3.googleusercontent.com/a/AATXAJxvpBWun5zQgjfm3xXe2Sw7E_rATjUx-BGsalxF=s96-c' alt='avatar' />
													</div>
													<div className='item-notify-right'>
														<p className='item-notify-content line-clamp-two'>Hoang Long Hoang Long Hoang Long Hoang Long Hoang Long alo alo</p>
														<p className='item-notify-time'> 5 thang truoc</p>
													</div>
												</div>

											</div>
										</div>
									}
									trigger="click"
								>
									<div className='d-flex'>
										<IconBell className='header-bell' />
									</div>
								</Popover>
								<Popover
									overlayClassName="wrapper-popover"
									placement="bottomRight"
									title={
										<div className='wrapper-form-action'>
											<div>
												<img className='image-avatar' src={authSlice.data?.avatarUser} alt={authSlice.data?.fullName} />
											</div>
											<div>
												<p>{authSlice.data?.fullName}</p>
												<p>hihi</p>
											</div>
										</div>
									}
									content={
										<div className='header-content-avatar'>
											<Link to="/me" className="header-menu">
												<p>
													Trang cá nhân
												</p>
											</Link>
											<Link to="/bai-viet-moi" className="header-menu">
												<p>
													Tạo bài viết
												</p>
											</Link>
											<p className="header-menu" onClick={logout}>
												Đăng xuất
											</p>
										</div>
									}
									trigger="click"
								>
									<div className='d-flex'>
										<img className='image-avatar' src={authSlice.data?.avatarUser} alt={authSlice.data?.fullName} />
									</div>
								</Popover>
							</Space>
						)}
						{isEmpty(authSlice.data) && (
							<Space size="middle">
								<Button type="primary" onClick={handleRedirectUrl('/dang-nhap')}>
									Đăng nhập
								</Button>
								<Button onClick={handleRedirectUrl('/dang-ky')}>
									Đăng ký
								</Button>
							</Space>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header