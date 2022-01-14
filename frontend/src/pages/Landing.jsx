import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
import MainImg from './../assets/img/main.svg';
import Wrapper from './../assets/wrappers/LandingPage';

export default function Landing() {
   return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						job <span> tracker</span> app
					</h1>
					<p>
						Article nor prepare chicken you him now. Shy merits say advice
						ten before lovers innate add. She cordially behavior can
						attempted estimable. Trees delay fancy noise manor do as an
						small. Felicity now law securing breeding likewise extended
						and. Roused either who favour why sham.
					</p>
					<Link to='/register' className='btn btn-hero'>
						Login/Register
					</Link>
				</div>
				<img className='img main-img' src={MainImg} alt='job banner' />
			</div>
		</Wrapper>
	);
}
