import React from 'react';
import './LoadProgress.css';

/**
 * Displays loading progress indicator.
 */
const LoadProgress = () => {
	return (
		<div className="row">
			<div className="load-progress col-sm-10 col-sm-push-1 col-md-8 col-md-push-2" >
				<span className="load-progress--spinner">
					<i className="fa fa-cog fa-spin fa-3x fa-fw" aria-hidden="true"></i><br />
					Loading data...
				</span>
			</div>
		</div>
	);
};

export default LoadProgress;
