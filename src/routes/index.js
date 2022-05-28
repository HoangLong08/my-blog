import Home from "pages/HomePage/Home";
import Detail from "pages/DetailPage/Detail";
import Auth from "pages/AuthPage/Auth";
import Overview from "pages/AdminPage/Overview";
import Posts from "pages/AdminPage/Posts/index";
import Users from "pages/AdminPage/Users/index";
import Blog from "pages/Blog/index";
import Login from "pages/AdminPage/Login";
import MyBlog from "pages/ProfilePage/MyBlog";
import EditBlog from "pages/Blog/EditBlog";
import Category from "pages/AdminPage/Category/index";
import Bookmark from "pages/ProfilePage/Bookmark";

const publicRoutes = [
	{ path: '/', component: Home, isFooter: 1, isHeader: 1, isLayoutProfile: 0 },
	{ path: '/dang-nhap', component: Auth, isFooter: 1, isHeader: 0, isLayoutProfile: 0 },
	{ path: '/dang-ky', component: Auth, isFooter: 1, isHeader: 0, isLayoutProfile: 0 },
	{ path: '/blog/:name/:idPost', component: Detail, isFooter: 1, isHeader: 1, isLayoutProfile: 0 },
	{ path: '/bai-viet-moi', component: Blog, isFooter: 0, isHeader: 1, isLayoutProfile: 0 },
	{ path: '/me', component: MyBlog, isFooter: 0, isHeader: 1, isLayoutProfile: 1 },
	{ path: '/me/bai-viet-cua-toi', component: MyBlog, isFooter: 0, isHeader: 1, isLayoutProfile: 1 },
	{ path: '/me/bookmark-cua-toi', component: Bookmark, isFooter: 0, isHeader: 1, isLayoutProfile: 1 },
	{ path: '/blog/edit/:idPost', component: EditBlog, isFooter: 0, isHeader: 1, isLayoutProfile: 0 },
]

const privateRoutes = [
	{ path: '/admin/dang-nhap', component: null, page: Login },
	{ path: '/admin/tong-quan', component: Overview, page: null },
	{ path: '/admin/bai-viet', component: Posts, page: null },
	{ path: '/admin/category', component: Category, page: null },
	{ path: '/admin/nguoi-dung', component: Users, page: null },
]

export { publicRoutes, privateRoutes }