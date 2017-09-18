import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import NoResultsBox from '../NoResultsBox/NoResultsBox';
import MovieEntry from '../MovieEntry/MovieEntry';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import LoadProgress from '../LoadProgress/LoadProgress';
import './App.css';

import SearchModel from '../../models/SearchModel';

class App extends Component {
	constructor( props ) {
		super( props );

		// Create search model and connect to callback called each time model is changed.
		this.searchModel = new SearchModel(
			data => this.handleModelChange( data ),
			() => this.handleModelError()
		);

		// Set the initial state.
		this.state = {
			error: null,
			page: 0,
			totalPages: 0,
			results: [],
			loading: false
		};

		// Bind methods to use inside JSX.
		this.handleQueryChange = this.handleQueryChange.bind( this );
		this.handleLoadMore = this.handleLoadMore.bind( this );
	}

	/**
	 * Called each time search model is changed.
	 */
	handleModelChange() {
		this.setState( {
			loading: false,
			error: null,
			page: this.searchModel.page,
			totalPages: this.searchModel.totalPages,
			results: this.searchModel.results
		} );
	}

	/**
	 * Called each time error occurs in search model.
	 */
	handleModelError() {
		this.setState( {
			loading: false,
			error: 'Cannot fetch data from The Movie DB. Please try again.'
		} );
	}

	/**
	 * Called when user changes query in search input.
	 *
	 * @param {String} query
	 */
	handleQueryChange( query ) {
		this.setState( { results: [], loading: true, error: '' } );
		this.searchModel.query = query;
		this.searchModel.getNextPage();
	}

	/**
	 * Called when "load more" button is pressed.
	 */
	handleLoadMore() {
		this.setState( { loading: true, error: '' } );
		this.searchModel.getNextPage();
	}

	render() {
		// When there are no search results - display box informing about it.
		const noResultsBox = this.state.results.length || this.state.loading ? null : <NoResultsBox/>;

		// Show search results when needed.
		let resultsComponent = null;
		const results = this.state.results;
		if ( results.length > 0 ) {
			const movies = results.map( movie => <MovieEntry key={ movie.id } model={ movie } /> );

			resultsComponent = <ul className="row" >{ movies }</ul>;
		}

		// Show "load more" button when needed.
		let loadMore = null;
		if ( this.state.page < this.state.totalPages && !this.state.loading ) {
			loadMore = <LoadMoreButton onClick={ this.handleLoadMore } />;
		}

		// Show loader progress when needed.
		let loader = null;
		if ( this.state.loading ) {
			loader = <LoadProgress />;
		}

		return (
			<div className="app container-fluid">
				<SearchBar onChange={ this.handleQueryChange } error={ this.state.error } />
				{ resultsComponent }
				{ loadMore }
				{ loader }
				{ noResultsBox }
			</div>
		);
	}
}

export default App;
