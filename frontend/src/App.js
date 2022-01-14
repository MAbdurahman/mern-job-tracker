import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Error, Landing, Register } from './pages';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/register' element={<Register />} />
				<Route path='/landing' element={<Landing />} />

				<Route path='*' element={<Error />} />
			</Routes>
		</BrowserRouter>
	);
}
