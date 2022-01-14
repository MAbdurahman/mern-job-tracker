import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from './../assets/img/not-found.svg';
import Wrapper from './../assets/wrappers/ErrorPage';

export default function Error() {
   return (
		<Wrapper className='full-page'>
			<div>
				<img src={NotFoundImage} alt='not found' />
				<h3>Ugh-oh! page not found</h3>
				<h4>We cannot find that page.</h4>
				<Link className='btn btn-error' to='/'>
					back home
				</Link>
			</div>
		</Wrapper>
	);
}
