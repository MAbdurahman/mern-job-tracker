import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import reducer from './reducer';

import {
	DISPLAY_ALERT,
	CLEAR_ALERT,
	REGISTER_USER_BEGIN,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_ERROR,
	TOGGLE_SIDEBAR,
	LOGOUT_USER,
	UPDATE_USER_BEGIN,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_ERROR,
	HANDLE_CHANGE,
	CLEAR_VALUES,
	CREATE_JOB_BEGIN,
	CREATE_JOB_SUCCESS,
	CREATE_JOB_ERROR,
	GET_JOBS_BEGIN,
	GET_JOBS_SUCCESS,
	SET_EDIT_JOB,
	DELETE_JOB_BEGIN,
	EDIT_JOB_BEGIN,
	EDIT_JOB_SUCCESS,
	EDIT_JOB_ERROR,
	SHOW_STATS_BEGIN,
	SHOW_STATS_SUCCESS,
	CLEAR_FILTERS,
	CHANGE_PAGE,
} from './actions';

const initialState = {
	isLoading: false,
	showAlert: false,
	alertText: '',
	alertType: '',
	user: null,
	token: null,
	userLocation: '',
	jobLocation: '',
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	//**************** functions ****************//
	const displayAlert = () => {
		dispatch({ type: DISPLAY_ALERT });
		clearAlert();
	};

	const clearAlert = () => {
		setTimeout(() => {
			dispatch({ type: CLEAR_ALERT });
		}, 3500);
	};

	const registerUser = async currentUser => {
		dispatch({ type: REGISTER_USER_BEGIN });
		try {
			const response = await axios.post('api/v1/auth/register', currentUser);

			console.log(response);

			const { user, token, location } = response.data;

			dispatch({
				type: REGISTER_USER_SUCCESS,
				payload: { user, token, location },
			});
		} catch (error) {
			console.log(error.response);
			dispatch({
				type: REGISTER_USER_ERROR,
				payload: { msg: error.response.data.msg },
			});
		}
		clearAlert();
	
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				displayAlert,
				registerUser,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
