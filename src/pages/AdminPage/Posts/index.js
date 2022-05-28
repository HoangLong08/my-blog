import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Table from 'components/Table/index'
import { Space, Button, Input, Tag, Popover, Typography, Modal, Select } from 'antd'
import { IconSearch, IconThreeDotsVert } from 'assets/index'
import { nanoid } from 'nanoid'
import { deletePostAction, getListPostAction, blockOrUnblockPostAction } from 'store/post/actions'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Link, useNavigate } from 'react-router-dom'
import { isEmpty } from "lodash";
import removeVietnameseTones from 'utils/removeVietnameseTones';
import "./style.css";

const { Text } = Typography;
const { Option } = Select;

const columns = [
	{
		title: 'Tiêu đề',
		dataIndex: 'title',
		key: 'title'
	},
	{
		title: 'Tác giả',
		dataIndex: 'author',
		key: 'author'
	},
	{
		title: 'Ngày xuất bản',
		dataIndex: 'time',
		key: 'time'
	},
	{
		title: 'Trạng thái',
		dataIndex: 'status',
		key: 'status'
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action',
		width: 100,
		align: "right"
	}
];

function Posts() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const listPost = useSelector((state) => state.postSlice.listPost);

	const [loading, setLoading] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState({
		type: "",
		id: ""
	});

	useEffect(() => {
		dispatch(getListPostAction({ role: "admin" }));
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

	const handleOk = async () => {
		await setLoading(true);
		if (isModalVisible.type === "delete") {
			await dispatch(deletePostAction({
				idPost: isModalVisible.id
			}))
		} else {
			await dispatch(blockOrUnblockPostAction({
				idPost: isModalVisible.id,
				status: isModalVisible.status
			}))
		}
		await setLoading(false)
		await setIsModalVisible({
			type: "",
			id: ""
		});
		await dispatch(getListPostAction({ role: "admin" }));
	};

	const handleCancel = () => {
		setIsModalVisible({
			type: "",
			id: ""
		});
	};

	const renderDataSource = () => {
		return listPost.data.map(item => {
			const convertNoTone = removeVietnameseTones(item.title);
			return {
				key: nanoid(),
				title: <Link to={`/blog/${convertNoTone}/${item.id}`}>{item.title}</Link>,
				author: item.fullName,
				time: convertTime(item.updatedAt?.seconds * 1000),
				status: (
					<Tag color={item.isApprove ? "success" : "error"}>{item.isApprove ? "công khai" : "bị khóa"}</Tag>
				),
				action: (
					<Popover
						overlayClassName="wrapper-admin-action"
						placement="bottomRight"
						content={
							<div className='content-admin-action'>
								<div className='admin-action-item' onClick={() => setIsModalVisible({ type: "block", id: item.id, status: item.isApprove })}>
									<Text>{item.isApprove ? "Khóa blog" : "Phê duyệt"} </Text>
								</div>
								<hr />
								<div className='admin-action-item'>
									<Link to={`/blog/edit/${item.id}`}>
										<Text type="primary">Edit blog</Text>
									</Link>
								</div>
								<hr />
								<div className='admin-action-item' onClick={() => setIsModalVisible({ type: "delete", id: item.id })}>
									<Text type="danger">Delete blog</Text>
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
			};
		});
	};

	return (
		<div className='customize-scroll'>
			<Header
				left={"Bài viết"}
				right={
					<Space size="middle">
						<Input size="middle" placeholder="Tìm kiếm" prefix={<IconSearch />} />
						<Select defaultValue="all" style={{ width: 120 }} >
							<Option value="all">Tất cả</Option>
							<Option value="today">Mới nhất</Option>
							<Option value="sixMonth">6 tháng</Option>
						</Select>
						<Select defaultValue="allApprove" style={{ width: 120 }} >
							<Option value="allApprove">Tất cả</Option>
							<Option value="noApprove">Chưa duyệt</Option>
							<Option value="approved">Đã duyệt</Option>
						</Select>
						<Button type="primary" size="middle" onClick={() => navigate("/bai-viet-moi")}>
							Tạo bài viết
						</Button>
					</Space>
				}
			/>
			<Table data={renderDataSource()} tableHead={columns} loading={listPost.load} />
			<Modal
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
			</Modal>
		</div>
	)
}

export default Posts