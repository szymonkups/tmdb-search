/**
 * Class representing movie model.
 */
export default class MovieModel {
	/**
	 * Class constructor.
	 *
	 * @param {Object} config Configuration object returned from TMDb
	 * @param {Object} data Object describing single movie returned from TMDb.
	 */
	constructor( data, config ) {
		this._config = config;
		this._title = data.title;
		this._id = data.id;
		this._overview = data.overview;
		this._posterPath = data.poster_path;
		this._voteAverage = data.vote_average;
		this._releaseDate = data.release_date;
	}

	/**
	 * Returns movie id.
	 *
	 * @returns {Number}
	 */
	get id() {
		return this._id;
	}

	/**
	 * Returns movie title.
	 *
	 * @returns {String}
	 */
	get title() {
		return this._title;
	}

	/**
	 * Returns movie overview text.
	 *
	 * @returns {String}
	 */
	get overview() {
		return this._overview;
	}

	/**
	 * Returns movie average vote.
	 *
	 * @returns {Number}
	 */
	get voteAverage() {
		return this._voteAverage;
	}

	/**
	 * Returns movie release date.
	 *
	 * @returns {String}
	 */
	get releaseDate() {
		return this._releaseDate;
	}

	/**
	 * Returns URL of the poster or undefined if poster is not present.
	 *
	 * @returns {String|undefined}
	 */
	get posterUrl() {
		const config = this._config.images;

		if ( !this._posterPath || config.poster_sizes.indexOf( 'w92' ) === -1 ) {
			return;
		}

		return config.base_url + '/w92/' + this._posterPath;
	}
}
