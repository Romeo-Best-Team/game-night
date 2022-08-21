import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "./SignUpForm.css";

export const SignUpForm = () => {
	const [showMessage, setShowMessage] = useState(false);
	const [formData, setFormData] = useState({});

	const validate = (data) => {
		let errors = {};

		if (!data.firstname) {
			errors.firstname = "First Name is required.";
		}
		if (!data.lastname) {
			errors.lastname = "Last Name is required.";
		}
		if (!data.username) {
			errors.username = "Username is required.";
		}
		if (!data.email) {
			errors.email = "Email is required.";
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
		) {
			errors.email = "Invalid email address. E.g. example@email.com";
		}
		if (!data.password) {
			errors.password = "Password is required.";
		}

		return errors;
	};

	const onSubmit = (data, form) => {
		setFormData(data);
		setShowMessage(true);
		// clear form
		form.restart();
	};

	const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
	const getFormErrorMessage = (meta) => {
		return (
			isFormFieldValid(meta) && (
				<small className="p-error">{meta.error}</small>
			)
		);
	};

	const dialogFooter = (
		<div className="flex justify-content-center">
			<Button
				label="OK"
				className="p-button-text"
				autoFocus
				onClick={() => setShowMessage(false)}
			/>
		</div>
	);
	const passwordHeader = <h6>Pick a password</h6>;
	const passwordFooter = (
		<React.Fragment>
			<Divider />
			<p className="mt-2">Suggestions</p>
			<ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
				<li>At least one lowercase</li>
				<li>At least one uppercase</li>
				<li>At least one numeric</li>
				<li>Minimum 8 characters</li>
			</ul>
		</React.Fragment>
	);

	return (
		<Container as={Row} className="form-signup">
			<Dialog
				visible={showMessage}
				onHide={() => setShowMessage(false)}
				position="top"
				footer={dialogFooter}
				showHeader={false}
				breakpoints={{ "960px": "80vw" }}
				style={{ width: "30vw" }}
			>
				<div className="flex align-items-center flex-column pt-6 px-3">
					{/* add gamenight logo here */}
					<h3>Registration Successful!</h3>
					<p style={{ lineHeight: 1.5 }}>
						Your account is registered under name{" "}
						<b>{formData.username}</b>
					</p>
				</div>
			</Dialog>
			<Col></Col>
			<Col>
				<div className="flex justify-content-center">
					<div className="card">
						<h2 className="text-center">Sign Up</h2>
						<Form
							onSubmit={onSubmit}
							initialValues={{
								firstname: "",
								lastname: "",
								username: "",
								email: "",
								password: "",
							}}
							validate={validate}
							render={({ handleSubmit }) => (
								<form
									onSubmit={handleSubmit}
									className="p-fluid"
								>
									<Field
										name="firstname"
										render={({ input, meta }) => (
											<div className="field">
												<span className="p-float-label">
													<InputText
														id="firstname"
														{...input}
														autoFocus
														className={classNames({
															"p-invalid":
																isFormFieldValid(
																	meta
																),
														})}
													/>
													<label
														htmlFor="firstname"
														className={classNames({
															"p-error":
																isFormFieldValid(
																	meta
																),
														})}
													>
														First Name*
													</label>
												</span>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
									<Field
										name="lastname"
										render={({ input, meta }) => (
											<div className="field">
												<span className="p-float-label">
													<InputText
														id="lastname"
														{...input}
														className={classNames({
															"p-invalid":
																isFormFieldValid(
																	meta
																),
														})}
													/>
													<label
														htmlFor="lastname"
														className={classNames({
															"p-error":
																isFormFieldValid(
																	meta
																),
														})}
													>
														Last Name*
													</label>
												</span>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
									<Field
										name="username"
										render={({ input, meta }) => (
											<div className="field">
												<span className="p-float-label">
													<InputText
														id="username"
														{...input}
														className={classNames({
															"p-invalid":
																isFormFieldValid(
																	meta
																),
														})}
													/>
													<label
														htmlFor="username"
														className={classNames({
															"p-error":
																isFormFieldValid(
																	meta
																),
														})}
													>
														Username*
													</label>
												</span>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
									<Field
										name="email"
										render={({ input, meta }) => (
											<div className="field">
												<span className="p-float-label p-input-icon-right">
													<i className="pi pi-envelope" />
													<InputText
														id="email"
														{...input}
														className={classNames({
															"p-invalid":
																isFormFieldValid(
																	meta
																),
														})}
													/>
													<label
														htmlFor="email"
														className={classNames({
															"p-error":
																isFormFieldValid(
																	meta
																),
														})}
													>
														Email*
													</label>
												</span>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
									<Field
										name="password"
										render={({ input, meta }) => (
											<div className="field">
												<span className="p-float-label">
													<Password
														id="password"
														{...input}
														toggleMask
														className={classNames({
															"p-invalid":
																isFormFieldValid(
																	meta
																),
														})}
														header={passwordHeader}
														footer={passwordFooter}
													/>
													<label
														htmlFor="password"
														className={classNames({
															"p-error":
																isFormFieldValid(
																	meta
																),
														})}
													>
														Password*
													</label>
												</span>
												{getFormErrorMessage(meta)}
											</div>
										)}
									/>
									<Button
										type="submit"
										label="Submit"
										className="mt-2"
									/>
								</form>
							)}
						/>
					</div>
				</div>
			</Col>
			<Col></Col>
		</Container>
	);
};