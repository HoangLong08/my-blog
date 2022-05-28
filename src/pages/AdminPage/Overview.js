import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import { DatePicker } from 'antd';
import { nanoid } from 'nanoid';
import Table from 'components/Table/index';
import { Link } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import { getOverviewApi } from 'api/overview';
import "./style.css"
import removeVietnameseTones from 'utils/removeVietnameseTones';
ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const columns = [
	{
		title: 'Tiêu đề',
		dataIndex: 'title',
		key: 'title',
	},
	{
		title: 'Tác giả',
		dataIndex: 'author',
		key: 'author'
	},
	{
		title: 'View',
		dataIndex: 'view',
		key: 'view',
		width: 80
	}
];

const data = {
	labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
	borderWidth: 1,
	datasets: [
		{
			label: "Lượt truy cập",
			data: [33, 53, 85, 41, 44, 65],
			fill: true,
			backgroundColor: "rgba(255, 99, 132, 0.2)",
			borderColor: "rgb(255, 99, 132)"
		},
		{
			label: "Lượt đăng ký",
			data: [33, 25, 35, 51, 54, 76],
			fill: false,
			backgroundColor: "rgba(54, 162, 235, 0.2)",
			borderColor: "rgb(54, 162, 235)"
		}
	]
};

function Overview() {
	const [dataOverview, setDataOverview] = useState({})
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			const res = await getOverviewApi();
			setLoading(false)
			setDataOverview(res)
		}
		fetchData()
	}, [])

	const renderDataSource = () => {
		return dataOverview?.listTopPostMostView?.map(item => {
			const convertNoTone = removeVietnameseTones(item.title);
			return {
				key: nanoid(),
				title: <Link to={`/blog/${convertNoTone}/${item.id}`}>{item.title}</Link>,
				author: item.fullName,
				view: item.viewer
			};
		});
	};

	return (
		<div>
			<div>
				<Header
					left="Tổng quan"
					right={
						<>
							<RangePicker
								placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
								// defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
								format={dateFormat}
							/>
						</>
					}
				/>
			</div>
			<div className='over-view-top'>
				<div className='over-view-box over-view-top-item'>
					<h1>{dataOverview?.totalPost || 0}</h1>
					<p className='title-overview'>Tổng số bài viết</p>
				</div>
				<div className='over-view-box over-view-top-item'>
					<h1>{dataOverview?.totalComment || 0}</h1>
					<p className='title-overview'>Tổng số bình luận</p>
				</div>
				<div className='over-view-box over-view-top-item'>
					<h1>{dataOverview?.totalUser || 0}</h1>
					<p className='title-overview'>Tổng số người dùng</p>
				</div>
			</div>
			<div className='over-view-bottom'>
				<div className='over-view-box over-view-chart'>
					<div style={{ marginBottom: "12px" }}>
						<p className='title-overview'>Lượt truy cập trang web</p>
					</div>
					<Line data={data} />
				</div>
				<div className='over-view-box over-view-chart'>
					<div className='d-flex align-items-center justify-content-space-between' style={{ marginBottom: "12px" }}>
						<p className='title-overview'>Top bài viết</p>
						<Link to="/admin/bai-viet">Xem tất cả</Link>
					</div>
					<Table data={renderDataSource()} tableHead={columns} loading={loading} pagination={false} />
				</div>
			</div>
		</div>
	)
}

export default Overview