import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';

export default function App() {
  return (
		<BrowserRouter>
			<nav>
				<Link to='/'>Dashboard</Link>
				{' |'}
				<Link to='/register'>Register</Link>
				{' |'}
				<Link to='/landing'>Landing</Link>
			</nav>
			<Routes>
				<Route path='/' element={<div>Dashboard</div>} />
				<Route path='/register' element={<div>Register</div>} />
				<Route path='/landing' element={<Landing />} />

				<Route path='*' element={<h1>Error</h1>} />
			</Routes>
		</BrowserRouter>
  );
}
