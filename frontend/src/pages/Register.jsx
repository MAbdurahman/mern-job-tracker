import React, { useState, useEffect } from 'react';
import Wrapper from './../assets/wrappers/RegisterPage';
import { Logo, FormRow, Alert } from './../components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

export default function Register() {
	//**************** variables ****************//
	const navigate = useNavigate();
	const [values, setValues] = useState(initialState);
	const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } = useAppContext();

	//**************** functions ****************//
	function Register() {
		const [values, setValues] = useState(initialState);
	}
	const handleChange = e => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};
	const onSubmit = e => {
		e.preventDefault();
		const { name, email, password, isMember } = values;

		if (!email || !password || (!isMember && !name)) {
			displayAlert();
			return;
		}
		
		const currentUser = {name, email, password};

		if (isMember) {
			loginUser(currentUser);

		} else {
			registerUser(currentUser);

		}
		
	};
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 3500);
		}
	}, [user, navigate]);
	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}
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
					type='text'
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
					disabled={isLoading}
				>
					{isLoading ? 'processing...' : 'submit'}
				</button>
				<p>
					{values.isMember ? `Don't have an account?` : 'Have an account?'}
					<button
						type='button'
						onClick={toggleMember}
						className='member-btn'
					>
						{values.isMember ? 'Register Here!' : 'Login Here!'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
}
