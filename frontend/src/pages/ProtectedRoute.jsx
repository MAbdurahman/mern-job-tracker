import React from 'react';
import { useAppContext } from './../context/appContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
	//**************** variables ****************//
	const { user } = useAppContext();
	//**************** redirecting ****************//
	if (!user) {
		return <Navigate to='/landing' />;
	}
	return children;
};
