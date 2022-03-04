import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/JobsContainer';
import Loading from './Loading';
import Job from './Job';

export default function JobsContainer() {
   return (
      <Wrapper>
         <h2>JobsContainer</h2>
      </Wrapper>
   )
}
