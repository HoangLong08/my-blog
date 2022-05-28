import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { IconDashboard, IconPost, IconReport, IconTag, IconUser } from 'assets/index'
import "./style.css"

const arrAdmin = [
	{
		icon: <IconDashboard />,
		des: "Tổng quan",
		link: "/admin/tong-quan"
	},
	{
		icon: <IconPost />,
		des: "Bài viết",
		link: "/admin/bai-viet"
	},
	{
		icon: <IconTag />,
		des: "Thể loại / tags",
		link: "/admin/category"
	},
	{
		icon: <IconReport />,
		des: "Báo cáo vi phạm",
		link: "/admin/bao-cao-vi-pham"
	},
	{
		icon: <IconUser />,
		des: "Tài khoản",
		link: "/admin/nguoi-dung"
	},
];

const arrUser = [
	{
		icon: <IconDashboard />,
		des: "Bài viết của tôi",
		link: "/me/bai-viet-cua-toi"
	},
	{
		icon: <IconPost />,
		des: "Bookmark của tôi",
		link: "/me/bookmark-cua-toi"
	},
	{
		icon: <IconUser />,
		des: "Thông tin cá nhân",
		link: "/me/thong-tin-ca-nhan"
	},
]

function Sidebar({ type }) {
	const location = useLocation();
	const pathUrl = location && location.pathname;
	const [arrMenu, setArrMenu] = useState([]);
	useEffect(() => {
		if (type) {
			setArrMenu(arrUser)
		} else {
			setArrMenu(arrAdmin)
		}
	}, [type])

	const checkUrlActive = (tmpOne, tmpTwo) => {
		return tmpOne.includes(tmpTwo.split('/')[2]);
	};

	return (
		<div className="wrapper-sidebar">
			<div>
				{arrMenu.map(item =>
					<NavLink
						key={nanoid()}
						to={item.link}
						className={({ isActive }) =>
							isActive || checkUrlActive(pathUrl, item.link)
								? 'item-menu-sidebar menu-item-link-active'
								: 'item-menu-sidebar menu-item-link'
						}>
						<div className='wrapper-form-action sidebar-item'>
							<div className="d-flex sidebar-icon">
								{item.icon}
							</div>
							<p className="sidebar-item-des">{item.des}</p>
						</div>
					</NavLink>
				)}
			</div>
		</div>
	)
}

export default Sidebar