/**
 * The Movie Database API key and base URL.
 */
export const config = {
	key: 'cf7fbbecabf50a465c258f6d2b450ff0',
	baseUrl: 'https://api.themoviedb.org/3'
};

/**
 * Creates URL to The Movie Database.
 *
 *		// Will return 'https://api.themoviedb.org/3/movies/search?api_key=(...)&page=1&query=batman';
 *		const url = createUrl( '/movies/search', { page: 1, query: 'batman' } );
 *
 * @param {String} path
 * @param {Object} [parameters={}]
 */
export function createUrl( path, parameters = {} ) {
	parameters.api_key = config.key;
	const paramString = Object.keys( parameters ).map( key => key + '=' + parameters[ key ] ).join( '&' );

	return config.baseUrl + path + '?' + paramString;
}
