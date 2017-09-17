/* global fetch */

import { createUrl } from './config';

/**
 * Executes HTTP GET request to obtain search results from server.
 *
 * @throws {Error} Throws error when request cannot be performed. Use catch() on the returned promise to properly handle
 * this error.
 * @param {String} query Search query.
 * @param {Number} page Number of result page to obtain.
 * @param {Function} [fetchMethod=fetch] Method used to fetch data. As a default window.fetch is used, but can be replaced
 * by other function that does the same job and returns Promise.
 * @returns {Promise} Resolved with
 */
export default function( query, page, fetchMethod = fetch ) {
	const url = createUrl( '/search/movie', { query, page } );

	return fetchMethod( url )
		.then( response => {
			if ( !response.ok ) {
				throw new Error();
			}

			return response.json();
		} );
}
