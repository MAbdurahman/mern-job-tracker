import React, { useState } from 'react';
import { FormRow, Alert } from './../../components';
import { useAppContext } from './../../context/appContext';
import Wrapper from './../../assets/wrappers/DashboardFormPage';

export default function Profile() {
	//**************** variables ****************//
	const { user, showAlert, displayAlert, updateUser, isLoading } =
		useAppContext();

	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [location, setLocation] = useState(user?.location);

	//**************** functions ****************//
   const handleSubmit = e => {
		e.preventDefault();
		if (!name || !email || !location) {
			displayAlert();
			return;
		}
		updateUser({ name, email, location });
	};
	return (
		<Wrapper>
			<form className='form' onSubmit={handleSubmit}>
				<h3>profile</h3>
				{showAlert && <Alert />}
				<div className='form-center'>
					<FormRow
						type='text'
						name='name'
						value={name}
						handleChange={e => setName(e.target.value)}
					/>
					<FormRow
						type='text'
						name='email'
						value={email}
						handleChange={e => setEmail(e.target.value)}
					/>
					<FormRow
						type='text'
						name='location'
						value={location}
						handleChange={e => setLocation(e.target.value)}
					/>
					<button
						className='btn btn-half-block'
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? 'Updating changes...' : 'save changes'}
					</button>
				</div>
			</form>
		</Wrapper>
	);
}
