import React from 'react';
import './LoadMoreButton.css';

/**
 * Displays button used to load more movie entries.
 */
const LoadMoreButton = props => {
	return (
		<div className="row">
			<div className="load-more col-sm-10 col-sm-push-1 col-md-8 col-md-push-2" >
				<button className="load-more--button" onClick={ props.onClick }>
					<i className="fa fa-arrow-down load-more--icon" aria-hidden="true"></i>
				</button>
			</div>
		</div>
	);
};

export default LoadMoreButton;
