import React, { useEffect } from 'react'
import Header from '../components/Header';
import { Space, Input, Tag, Popover, Typography } from "antd"
import { IconSearch, IconThreeDotsVert } from 'assets/index'
import Table from 'components/Table/index';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserAction } from "store/user/actions"
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { nanoid } from 'nanoid'

const { Text } = Typography;
const columns = [
	{
		title: 'Họ và tên',
		dataIndex: 'fullName',
		key: 'fullName'
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email'
	},
	{
		title: 'Số bài viết',
		dataIndex: 'numberPost',
		key: 'numberPost'
	},
	{
		title: 'Số comment',
		dataIndex: 'numberComment',
		key: 'numberComment'
	},
	{
		title: 'Thời gian đăng nhập', // final
		dataIndex: 'timeLogin',
		key: 'timeLogin'
	},
	{
		title: 'Role', // final
		dataIndex: 'role',
		key: 'role'
	},
	{
		title: 'Status', // final
		dataIndex: 'status',
		key: 'status'
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		width: 60
	},
]

function Users() {
	// history block account of user
	const dispatch = useDispatch();
	const listUser = useSelector((state) => state.userSlice.listUser);
	useEffect(() => {
		dispatch(getAllUserAction())
	}, [dispatch])

	const convertTime = _time => {
		if (_time) {
			const date = new Date(_time);
			const timeZone = 'Asia/Saigon';
			const zonedDate = utcToZonedTime(date, timeZone);
			const pattern = 'yyyy-MM-dd HH:mm:ss';
			const output = format(zonedDate, pattern, { timeZone: timeZone });
			return output;
		}
		return null;
	};

	const renderDataSource = () => {
		return listUser.data?.map(item => {
			return {
				key: nanoid(),
				fullName: item.fullName,
				email: item.email,
				numberPost: 9,
				numberComment: 9,
				timeLogin: convertTime(item.lastLogin?.seconds * 1000),
				role: item.isAdmin ? "Admin" : "User",
				status: (
					<Tag color={item.isActive ? "success" : "error"}>
						{item.isActive ? "Active" : "Block"}
					</Tag>
				),
				action: (
					<Popover
						overlayClassName="wrapper-admin-action"
						placement="bottomRight"
						content={
							<div className='content-admin-action'>
								<div className='admin-action-item' >
									<Text>{item.isActive ? "Khóa blog" : "Phê duyệt"} </Text>
								</div>
							</div >
						}
						trigger="click"
					>
						<div className='post-action'>
							<IconThreeDotsVert />
						</div>
					</Popover >
				)
			}
		})
	}
	return (
		<div className='customize-scroll'>
			<Header
				left={"Người dùng"}
				right={
					<Space size="middle">
						<Input size="middle" placeholder="Tìm kiếm" prefix={<IconSearch />} />
					</Space>
				}
			/>
			<Table data={renderDataSource()} tableHead={columns} loading={listUser.load} />
			{/* <Modal
				title="Bài viết"
				centered
				visible={!isEmpty(isModalVisible.id)}
				onOk={handleOk}
				confirmLoading={loading}
				onCancel={handleCancel}
			>
				{isModalVisible.type === "delete" && (
					<p>Bạn có chắc chắn muốn xóa bài viết này không ?</p>
				)}
				{isModalVisible.type === "block" && (
					<p>Bạn có chắc chắn {isModalVisible.status ? 'khóa' : 'mở'} xóa bài viết này không ?</p>
				)}
			</Modal> */}
		</div>
	)
}

export default Users