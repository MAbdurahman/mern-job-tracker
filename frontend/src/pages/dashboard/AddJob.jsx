import React from 'react';
import { FormRow, FormRowSelect, Alert } from './../../components';
import { useAppContext } from './../../context/appContext';
import Wrapper from './../../assets/wrappers/DashboardFormPage';

export default function AddJob() {
	//**************** variables ****************//
	const {
		isLoading,
		isEditing,
		editJob,
		showAlert,
		displayAlert,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		handleChange,
		clearValues,
		createJob,
	} = useAppContext();
	//**************** functions ****************//
	const handleJobInput = e => {
		const name = e.target.name;
		const value = e.target.value;
		handleChange({ name, value });
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (!position || !company || !jobLocation) {
			displayAlert();
			return;
		}
		if (isEditing) {
			editJob();
			return;
		}
		createJob();
	};
	return (
		<Wrapper>
			<form className='form'>
				<h3>{isEditing ? 'edit job' : 'add job'}</h3>
				{showAlert && <Alert />}
				<div className='form-center'>
					{/* position */}
					<FormRow
						type='text'
						labelText='Job Position'
						name='position'
						value={position}
						handleChange={handleJobInput}
					/>
					{/* company */}
					<FormRow
						type='text'
						labelText='Company Name'
						name='company'
						value={company}
						handleChange={handleJobInput}
					/>
					{/* location */}
					<FormRow
						type='text'
						labelText='Job Location'
						name='jobLocation'
						value={jobLocation}
						handleChange={handleJobInput}
					/>
					{/* job status */}
					<FormRowSelect
						name='status'
						labelText='job status'
						value={status}
						handleChange={handleJobInput}
						list={statusOptions}
					/>
					{/* job type */}
					<FormRowSelect
						name='jobType'
						labelText='job type'
						value={jobType}
						handleChange={handleJobInput}
						list={jobTypeOptions}
					/>

					{/* btn container */}
					<div className='btn-container'>
						<button
							type='submit'
							className='btn btn-block submit-btn'
							onClick={handleSubmit}
							disabled={isLoading}
						>
							{isLoading ? 'Processing...' : 'submit'}
						</button>
						<button
							className='btn btn-block clear-btn'
							onClick={e => {
								e.preventDefault();
								clearValues();
							}}
						>
							clear
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
}
