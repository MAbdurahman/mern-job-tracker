import React from 'react';
import Logo from './../assets/img/logo.svg';
import MainImg from './../assets/img/main.svg';
import Wrapper from './../assets/wrappers/LandingPage';

export default function Landing() {
   return (
		<Wrapper>
			<nav>
				<img className='logo' src={Logo} alt='logo' />
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
               <button className="btn btn-hero">Login/Register</button>
				</div>
            <img className='img main-img' src={MainImg} alt="job banner"/>
			</div>
		</Wrapper>
	);
}
