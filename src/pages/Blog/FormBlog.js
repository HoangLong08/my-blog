/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { uploadFile } from 'api/upload';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Select, Upload, Modal, Spin } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategoryAction } from 'store/category/actions';
import { nanoid } from 'nanoid';
import { some, isEmpty } from 'lodash'
import { usePrompt } from 'hooks/usePrompt';
import { createPostAction, getDetailPostAction, updatePostAction } from 'store/post/actions';
import ContentEditable from 'react-contenteditable'
import "react-markdown-editor-lite/lib/index.css";
import "./style.css"

const { Option } = Select;
const { Dragger } = Upload;

function FormBlog({ type }) {
	const { idPost } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authSlice = useSelector((state) => state.authSlice);
	const listCategory = useSelector((state) => state.categorySlice.listCategory);
	const detailPost = useSelector((state) => state.postSlice.detailPost);
	const mdParser = new MarkdownIt();

	const [valueForm, setValueForm] = useState({
		title: "",
		categories: [],
		thumbnail: "",
		html: "",
		text: ""
	})
	const [isPopoverAction, setIsPopoverAction] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formIsDirty, setFormIsDirty] = useState(false)


	useEffect(() => {
		dispatch(getListCategoryAction({ role: "user" }));
	}, [dispatch])

	useEffect(() => {
		if (!isEmpty(type) && !isEmpty(idPost)) {
			dispatch(getDetailPostAction({ idPost: idPost }))
		}
	}, [dispatch, type, idPost])

	useEffect(() => {
		if (!isEmpty(detailPost.data) && !isEmpty(type) && !isEmpty(idPost)) {
			setValueForm({
				title: detailPost.data.title,
				categories: detailPost.data.categories,
				thumbnail: detailPost.data.thumbnail,
				html: detailPost.data.description,
				text: detailPost.data.text
			});
			setFormIsDirty(true)
		}
	}, [detailPost.data, idPost, type])

	useEffect(() => {
		if (!isEmpty(valueForm.title) || !isEmpty(valueForm.text) || !isEmpty(valueForm.categories)) {
			setFormIsDirty(true)
		}
	}, [valueForm])

	usePrompt('B???n c?? mu???n r???i kh???i trang n??y kh??ng?', formIsDirty);

	function handleEditorChange({ html, text }) {
		setValueForm({
			...valueForm,
			html: html,
			text: text
		})
	}

	const onChange = (e, field) => {
		setValueForm({
			...valueForm,
			[field]: field === "title" ? e.target.value : e
		})
	}

	const onImageUpload = async (file) => {
		const res = await uploadFile(file)
		return res;
	}

	// eslint-disable-next-line no-unused-vars
	const [defaultFileList, setDefaultFileList] = useState([]);

	const handleOnChange = ({ file, fileList }) => {
		setDefaultFileList(fileList);
	};

	const customRequest = async (options) => {
		const { onSuccess, onError, file } = options;
		try {
			const res = await uploadFile(file);
			setValueForm({
				...valueForm,
				thumbnail: res
			});
			onSuccess("Ok");
		} catch (err) {
			console.log("err: ", err);
			onError({ err });
		}
	}

	const readingTime = () => {
		const text = valueForm.text;
		const wpm = 225;
		const words = text.trim().split(/\s+/).length;
		const time = Math.ceil(words / wpm);
		return time
	}

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const submitForm = async () => {
		await setFormIsDirty(false)
		await setLoading(true);
		if (!isEmpty(type)) {
			// console.log("edit blog")
			await dispatch(updatePostAction({
				...valueForm,
				timeRead: readingTime(),
				idPost: idPost
			}))
		} else {
			await dispatch(createPostAction({
				...valueForm,
				idUser: authSlice.data.idUser,
				timeRead: readingTime(),
			}))
		}
		await setLoading(false);
		await navigate(-1)
	}

	const handleRemoveThumbnail = () => {
		setValueForm({
			...valueForm,
			thumbnail: ""
		})
	}

	return (
		<>
			{!isEmpty(type) && detailPost.load && (
				<div className='d-flex align-items-center justify-content-center'>
					<Spin size="large" />
				</div>
			)}
			{!detailPost.load && (
				<>
					<ContentEditable
						spellCheck="false"
						className="new-post-title"
						html={valueForm.title}
						disabled={false}
						onChange={(e) => onChange(e, 'title')}
						placeholder="Ti??u ?????"
						tagName='div'
					/>
					<div className='d-flex -align-items-center justify-content-space-between wrapper-post-action'>
						<Select
							mode="multiple"
							allowClear
							style={{ width: '100%' }}
							placeholder="G???n th??? b??i vi???t c???a b???n. T???i ??a l?? 5 th???, ??t nh???t l?? 1 th???"
							value={valueForm.categories}
							filterOption={(inputValue, option) => {
								return option.children
									.toString()
									.toLowerCase()
									.includes(inputValue.toLowerCase())
							}

							}
							onChange={(e) => onChange(e, 'categories')}
						>
							{listCategory.data?.map(item => (
								<Option key={nanoid()} value={item.id}>{item.title}</Option>
							))}
						</Select>
						<div className="wrapper-post-upload">
							<Button
								type="primary"
								style={{ width: "130px" }}
								onClick={() => setIsPopoverAction(!isPopoverAction)}
							>
								T???i ???nh
							</Button>
							{isPopoverAction && (
								<div className="content-post-upload">
									<p>T???i l??n h??nh ???nh ch???t l?????ng cao s??? h???p d???n ng?????i ?????c h??n . Theo m???c ?????nh, h??nh ???nh ?????u ti??n trong b??i ????ng c???a b???n s??? ???????c s??? d???ng thay th???</p>
									{valueForm.thumbnail.length > 0 && (
										<div className="post-image-preview" style={{ backgroundImage: `url(${valueForm.thumbnail})` }}></div>
									)}
									<hr />
									<div className='d-flex align-items-center justify-content-space-between'>
										<Button
											type="primary"
											size="small"
											style={{ width: "100px" }}
											icon={<UploadOutlined />}
											onClick={() => setIsModalVisible(true)}
										>
											T???i ???nh
										</Button>
										<Button
											danger
											size="small"
											style={{ width: "100px" }}
											disabled={valueForm.thumbnail.length === 0}
											onClick={handleRemoveThumbnail}
										>
											X??a ???nh
										</Button>
									</div>
								</div>
							)}
						</div>
						<Button
							type="primary"
							style={{ width: "200px" }}
							disabled={some(valueForm, isEmpty)}
							loading={loading}
							onClick={submitForm}
						>
							{!isEmpty(type) ? "L??u v?? xu???t b???n" : "Xu???t b???n"}
						</Button>
					</div>
					<div className="wrapper-new-post-editor">
						<MdEditor
							placeholder="N???i dung vi???t ??? ????y"
							style={{ height: "calc(100vh - 100px)" }}
							// name="html"
							value={valueForm.text}
							renderHTML={(text) => mdParser.render(text)}
							onChange={handleEditorChange}
							onImageUpload={onImageUpload}
							linkTarget="_blank"
						/>
					</div>
				</>
			)}

			<Modal title="Th??m ???nh " visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Dragger name='file' accept="image/*" onChange={handleOnChange} customRequest={customRequest}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">K??o v?? th??? t???p tin ??? ????y ho???c nh???p chu???t ????? t???i t???p tin l??n</p>
				</Dragger>
			</Modal>
		</>
	)
}

export default FormBlog