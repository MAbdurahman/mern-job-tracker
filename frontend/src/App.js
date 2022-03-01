import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error, Landing, Register, ProtectedRoute } from './pages';
import {
	AddJob,
	AllJobs,
	Profile,
	SharedLayout,
	Stats 
} from './pages/dashboard';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<ProtectedRoute><SharedLayout /></ProtectedRoute>}>
					<Route index element={<Stats/>} />
					<Route path='all-jobs' element={<AllJobs/>} />
					<Route path='add-job' element={<AddJob/>} />
					<Route path='profile' element={<Profile/>} />
				</Route>
				<Route path='/' element={<div>temp-dashboard</div>} />
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />

				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}
