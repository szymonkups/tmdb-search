import React, { Component } from 'react';
import './NoResultsBox.css';

/**
 * Information displayed when there are no search results to display.
 */
class NoResultsBox extends Component {
	render() {
		return (
			<div className="no-results-box">
				<h1>No results found.</h1>
				<h2>Use search box above.</h2>
			</div>
		);
	}
}

export default NoResultsBox;
