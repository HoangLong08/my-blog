import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import { Button, Modal, Input } from "antd"
import ItemCategory from './ItemCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategoryAction, addCategoryAction, getDetailCategoryAction, editCategoryAction, deleteCategoryAction } from 'store/category/actions';
import { nanoid } from 'nanoid';
import "./style.css"

function Category() {
	const dispatch = useDispatch();
	const listCategory = useSelector((state) => state.categorySlice.listCategory);

	const [valueForm, setValueForm] = useState('');
	const [errorForm, setErrorForm] = useState('');
	const [isModalVisible, setIsModalVisible] = useState({
		type: "",
		id: ""
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		dispatch(getListCategoryAction({ role: "admin" }));
	}, [dispatch])

	const handleOk = async () => {
		let err = "";
		let isValid = true
		if (valueForm.trim().length === 0) {
			isValid = false;
			err = "Enter category"
		} else {
			err = ""
		}

		if (isValid) {
			await setLoading(true)
			if (isModalVisible.type === "add") {
				await dispatch(addCategoryAction({
					title: valueForm
				}))
			} else if (isModalVisible.type === "edit") {
				await dispatch(editCategoryAction({
					title: valueForm,
					idCategory: isModalVisible.id
				}))
			} else if (isModalVisible.type === "delete") {
				await dispatch(deleteCategoryAction({
					idCategory: isModalVisible.id
				}))
			}
			await dispatch(getListCategoryAction({ role: "admin" }));
			await setLoading(false)
		}
		setErrorForm(err);
		setIsModalVisible({
			type: "",
			id: ""
		});
	};

	const handleCancel = () => {
		setIsModalVisible({
			type: "",
			id: ""
		});
	};

	return (
		<div className='customize-scroll'>
			<Header
				left={"Thể loại / tag"}
				right={
					<Button
						type="primary"
						size="middle"
						onClick={() => setIsModalVisible({
							type: "add",
							id: ""
						})}
					>
						Tạo tag
					</Button>
				}
				className="box-header"
			/>
			<div className='wrapper-list-category'>
				{listCategory.load && (
					<>
						<ItemCategory
							title={"Loading ..."}
							numberPosts={0}
						/>
						<ItemCategory
							title={"Loading ..."}
							numberPosts={0}
						/>
						<ItemCategory
							title={"Loading ..."}
							numberPosts={0}
						/>
						<ItemCategory
							title={"Loading ..."}
							numberPosts={0}
						/>
						<ItemCategory
							title={"Loading ..."}
							numberPosts={0}
						/>
					</>
				)}
				{!listCategory.load && listCategory.data?.map((item) => (
					<ItemCategory
						key={nanoid()}
						title={item.title}
						isActive={item.isActive}
						numberPosts={6}
						onClickEdit={async () => {
							const res = await dispatch(getDetailCategoryAction({
								idCategory: item.id
							}))
							await setValueForm(res?.payload?.title)
							await setIsModalVisible({
								type: "edit",
								id: item.id
							})
						}}
						onClickDelete={() => setIsModalVisible({
							type: "delete",
							id: item.id
						})}
					/>
				))}
			</div>
			<Modal
				title={
					isModalVisible.type === "add" ?
						"Thêm thể loại / tag" :
						(isModalVisible.type === "edit" ? "Chỉnh sửa thể loại / tag" : (isModalVisible.type === "delete" ? "Xóa thể loại / tag" : "Khóa hoặc mở tag"))}
				visible={isModalVisible.type.length > 0}
				onOk={handleOk}
				onCancel={handleCancel}
				confirmLoading={loading}
			>
				{isModalVisible.type === "delete" && (
					<p>Bạn có chắn chắn muốn xóa thẻ này không ?</p>
				)}
				{isModalVisible.type === "block" && (
					<p>Hello</p>
				)}
				{isModalVisible.type !== "delete" && isModalVisible.type !== "block" && (
					<div>
						<Input
							status={errorForm.length > 0 ? "error" : ""}
							size="large"
							placeholder="Tên tag"
							allowClear
							onChange={(e) => setValueForm(e.target.value)}
							value={valueForm || ''}
						/>
						{errorForm.length > 0 && (
							<small className="form-error">{errorForm}</small>
						)}
					</div >
				)}
			</Modal>
		</div>
	)
}

export default Category