import React from 'react';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

export default function NavLinks({toggleSidebar}) {
	return (
		<div className='nav-links'>
			{links.map(link => {
				const { id, text, path, icon } = link;

				return (
					<NavLink
						key={id}
						to={path}
						onClick={toggleSidebar}
						className={({ isActive }) =>
							isActive ? 'nav-link active' : 'nav-link'
						}
					>
						<span className='icon'>{icon}</span>
						{text}
					</NavLink>
				);
			})}
		</div>
	);
}
