import React, { useState, useEffect } from 'react';
import Wrapper from './../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alert } from './../components';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
	showAlert: false,
};

export default function Register() {
	//**************** variables ****************//
	const [values, setValues] = useState(initialState);

	//**************** functions ****************//
	function Register() {
		const [values, setValues] = useState(initialState);
	}
	const handleChange = e => {
		console.log(e.target);
	};
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};
	const onSubmit = e => {
		e.preventDefault();
		console.log(e.target);
	};
	useEffect(() => {
		console.log('useEffect Method');
	}, []);
	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{values.showAlert && <Alert />}
				{/* name input */}
				{!values.isMember && (
					<FormRow
						type='text'
						name='name'
						value={values.name}
						handleChange={handleChange}
					/>
				)}

				{/* email input */}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password input */}
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>
				<button
					type='submit'
					className='btn btn-block'
					/* disabled={isLoading} */
				>
					submit
				</button>
				<p>
					{values.isMember ? `Don't have an account?` : 'Have an account?'}
					<button
						type='button'
						onClick={toggleMember}
						className='member-btn'
					>
						{values.isMember ? 'Register Here' : 'Login Here'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
}
