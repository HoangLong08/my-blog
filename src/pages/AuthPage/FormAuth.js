import React, { useState, useEffect } from 'react'
import { IconFacebook, IconGoogle } from 'assets/index'
import { Input } from 'antd';
import { Button } from '../../../node_modules/antd/lib/index';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { loginAction, loginWithGoogleAction, registerAction } from 'store/auth/actions';
import "./progressBar.css";
import "./style.css";

function FormAuth({ type }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [loadingSignInWithIcon, setLoadingSignInWithIcon] = useState(false);

	const [valueForm, setValueForm] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errorForm, setErrorForm] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	useEffect(
		() => () =>
			setValueForm({
				fullName: "",
				email: "",
				password: "",
				confirmPassword: "",
			}),
		[]
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValueForm({
			...valueForm,
			[name]: value.trim(),
		});
	};

	const handleSubmit = async () => {
		let isValid = true;
		const newError = {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		};
		const regexEmail =
			/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (valueForm.email.length === 0) {
			isValid = false;
			newError.email = "Enter email";
		} else if (!regexEmail.test(valueForm.email)) {
			isValid = false;
			newError.email = "Invalid email";
		} else {
			newError.email = "";
		}

		if (valueForm.password.length === 0) {
			isValid = false;
			newError.password = "Enter password";
		} else {
			newError.password = "";
		}

		if (type === "register") {
			if (valueForm.fullName.length === 0) {
				isValid = false;
				newError.fullName = "Enter your full name";
			} else {
				newError.fullName = "";
			}

			if (valueForm.password.length < 6) {
				isValid = false;
				newError.password = "At least six characters";
			} else {
				newError.password = "";
			}

			if (valueForm.confirmPassword.length === 0) {
				isValid = false;
				newError.confirmPassword = "Enter confirm password";
			} else if (valueForm.confirmPassword !== valueForm.password) {
				isValid = false;
				newError.confirmPassword = "Password no match";
			} else {
				newError.confirmPassword = "";
			}
		}

		if (isValid) {
			const { email, password, fullName } = valueForm;
			setLoading(true);
			if (type === "register") {
				const res = await dispatch(
					registerAction({
						email,
						password,
						fullName
					})
				);
				if (!isEmpty(res.payload)) {
					await navigate('/dang-nhap')
				}
			} else {
				const res = await dispatch(
					loginAction({
						email,
						password,
						role: type === "admin" ? "admin" : "user"
					})
				);
				if (!isEmpty(res.payload.data) && type !== "admin") {
					navigate("/");
				} else if (!isEmpty(res.payload.data) && type === "admin") {
					navigate("/admin/tong-quan");
				}
			}
			setValueForm({
				fullName: "",
				email: "",
				password: "",
				confirmPassword: "",
			})
			setLoading(false);
		}
		setErrorForm({ ...newError });
	}

	const handleLoginIcon = (icon) => async () => {
		setLoadingSignInWithIcon(true)
		if (icon === "google") {
			const res = await dispatch(loginWithGoogleAction({ typeAuth: "login" }))
			if (res?.payload?.type === "success") {
				navigate("/");
			}
		}
		setLoadingSignInWithIcon(false)
	}

	return (
		<div className="d-flex ">
			{type !== "admin" && (
				<>
					<div>
						<div className="wrapper-form-action sign-in-icon" onClick={handleLoginIcon('google')}>
							<IconGoogle />
							<p>Đăng nhập với google</p>
							{loadingSignInWithIcon && (
								<div className="wrapper-sign-in-progress">
									<div className="requestProgress">
										<div className="bar" />
									</div>
								</div>
							)}
						</div>
						<div className="wrapper-form-action sign-in-icon" onClick={handleLoginIcon('facebook')}>
							<IconFacebook />
							<p>Đăng nhập với facebook</p>
						</div>
					</div>
					<div className="form-border-right" />
				</>
			)}
			<div>
				{type === "register" &&
					<div className="form-group form-group-width">
						<Input
							status={errorForm.fullName.length > 0 ? "error" : ""}
							size="large"
							placeholder="Họ và tên"
							allowClear
							onChange={handleChange}
							name="fullName"
							value={valueForm.fullName || ''}
						/>
						{errorForm.fullName.length > 0 && (
							<small className="form-error">{errorForm.fullName}</small>
						)}
					</div>
				}
				<div className="form-group form-group-width">
					<Input
						status={errorForm.email.length > 0 ? "error" : ""}
						size="large"
						placeholder="Email"
						allowClear
						onChange={handleChange}
						name="email"
						value={valueForm.email || ''}
					/>
					{errorForm.email.length > 0 && (
						<small className="form-error">{errorForm.email}</small>
					)}
				</div>
				<div className="form-group form-group-width">
					<Input.Password
						status={errorForm.password.length > 0 ? "error" : ""}
						size="large"
						placeholder="Mật khẩu"
						allowClear
						onChange={handleChange}
						name="password"
						value={valueForm.password || ''}
						onPaste={(e) => {
							e.preventDefault()
							return false;
						}} onCopy={(e) => {
							e.preventDefault()
							return false;
						}}
					/>
					{errorForm.password.length > 0 && (
						<small className="form-error">{errorForm.password}</small>
					)}
				</div>
				{type === "register" && (
					<div className="form-group form-group-width">
						<Input.Password
							status={errorForm.confirmPassword.length > 0 ? "error" : ""}
							size="large"
							placeholder="Xác nhận mật khẩu"
							allowClear
							onChange={handleChange}
							name="confirmPassword"
							onPaste={(e) => {
								e.preventDefault()
								return false;
							}} onCopy={(e) => {
								e.preventDefault()
								return false;
							}}
							value={valueForm.confirmPassword || ''}
						/>
						{errorForm.confirmPassword.length > 0 && (
							<small className="form-error">{errorForm.confirmPassword}</small>
						)}
					</div>
				)}
				<Button type="primary" onClick={handleSubmit} loading={loading}>
					{type === "register" ? "Đăng ký" : "Đăng nhập"}
				</Button>
			</div>
		</div>
	)
}

export default FormAuth