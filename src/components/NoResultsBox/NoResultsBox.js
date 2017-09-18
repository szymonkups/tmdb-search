import React from 'react';
import './NoResultsBox.css';

/**
 * Information displayed when there are no search results to display.
 */
const NoResultsBox = () => (
	<div className="no-results-box">
		<h1>No results found.</h1>
		<h2>Use search box above.</h2>
	</div>
);

export default NoResultsBox;
