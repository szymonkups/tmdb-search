import search from '../api/search';
import configuration from '../api/configuration';
import MovieModel from './MovieModel';

/**
 * Class modeling search process. It is a bridge between API call and application view.
 */
export default class SearchModel {
	/**
	 * Class constructor.
	 *
	 * @param {Function} onModelChanged Callback function, called each time some data inside model is changed.
	 * @param {Function} onModelError Callback function, called when some error occurs.
	 */
	constructor( onModelChanged, onModelError ) {
		this._query = '';
		this._page = 0;
		this._totalPages = 0;
		this._results = [];

		this._onModelChanged = onModelChanged;
		this._onModelError = onModelError;
	}

	/**
	 * Sets search query to new one. After changing the query, `getNextPage()` method will return first page of results.
	 *
	 * @param {String} value
	 */
	set query( value ) {
		this._query = value;
		this._page = 0;
	}

	/**
	 * Returns array of results with movies descriptions.
	 *
	 * @returns {Array.<Movie>}
	 */
	get results() {
		return this._results;
	}

	/**
	 * Fetches next page of movies. Calls `onModelChanged` method provided to the constructor.
	 */
	getNextPage() {
		search( this._query, this._page + 1 )
			.then( data => {
				return configuration().then( config => {
					const currentResults = data.results.map( movie => new MovieModel( movie, config ) );

					this._page = data.page;
					this._results = this._page === 1 ? currentResults : this._results.concat( currentResults );
					this._totalPages = data._totalPages;

					this._onModelChanged();
				} );
			} )
			.catch( e => {
				this._onModelError( e );
			} );
	}
}
