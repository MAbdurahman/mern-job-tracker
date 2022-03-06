import React, { useEffect } from 'react';
import { useAppContext } from './../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from './../../components';

export default function Stats() {
	//**************** variables ****************//
	const { showStats, isLoading, monthlyApplications } = useAppContext();

	//**************** functions ****************//
	useEffect(() => {
		showStats();
		// eslint-disable-next-line
	}, []);

	if (isLoading) {
		return <Loading center />;
	}

	return (
		<>
			<StatsContainer />
			{monthlyApplications.length > 0 && <ChartsContainer />} 
		</>
	);
}
