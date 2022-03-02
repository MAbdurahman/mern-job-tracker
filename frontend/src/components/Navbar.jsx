import React, { useState } from 'react';
import Wrapper from './../assets/wrappers/Navbar';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from './../context/appContext';
import Logo from './Logo';

export default function Navbar() {
	//**************** variables ****************//
	const [showLogout, setShowLogout] = useState(false);
	const { toggleSidebar, logoutUser, user } = useAppContext();
	//**************** functions ****************//
	function getFirstName(userName) {
		return userName.split(' ')[0];
	}

	return (
		<Wrapper>
			<div className='nav-center'>
				<button
					type='button'
					className='toggle-btn'
					onClick={toggleSidebar}
				>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className='logo-text'>dashboard</h3>
				</div>
				<div className='btn-container'>
					<button
						type='button'
						className='btn'
						onClick={() => setShowLogout(!showLogout)}
					>
						<FaUserCircle />
						{getFirstName(user?.name)}
						<FaCaretDown />
					</button>
					<div
						className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}
					>
						<button
							type='button'
							className='dropdown-btn'
							onClick={logoutUser}
						>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
}
