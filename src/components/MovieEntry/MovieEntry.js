import React, { Component } from 'react';
import './MovieEntry.css';
import placeholder from './placeholder.png';

class MovieEntry extends Component {
	render() {
		const movie = this.props.model;
		const posterUrl = movie.posterUrl || placeholder;

		return (
			<li className="movie-entry col-sm-10 col-sm-push-1 col-md-8 col-md-push-2">
				<img className="movie-entry__poster" src={ posterUrl } alt={ movie.title + ' poster' } />
				<h2 className="movie-entry__title">{ movie.title }</h2>
				<p className="movie-entry__tags">
					<Tag icon="star" text={ movie.voteAverage } />&nbsp;
					<Tag icon="calendar" text={ movie.releaseDate } />
				</p>
				<p className="movie-entry__overview">{ movie.overview }</p>
			</li>
		);
	}
}

const Tag = props => (
	<span className="movie-entry__tag">
		<i className={ 'fa fa-' + props.icon } aria-hidden="true"></i>
		&nbsp;&nbsp;
		{ props.text }
	</span> );

export default MovieEntry;
