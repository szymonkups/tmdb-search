/* global fetch */

import { createUrl } from './config';

// Fetch only once per application runtime.
let config;

/**
 * Executes HTTP GET request to obtain configuration from server.
 *
 * @throws {Error} Throws error when request cannot be performed. Use catch() on the returned promise to properly handle
 * this error.
 * @param {Boolean} [useCache=true] When set to false server will be called each time method is called. If true - only one
 * call per application lifetime is made.
 * @param {Function} [fetchMethod=fetch] Method used to fetch data. As a default window.fetch is used, but can be replaced
 * by other function that does the same job and returns Promise.
 * @returns {Promise} Resolved with configuration data.
 */
export default function( useCache = true, fetchMethod = fetch ) {
	// If config is already present - return resolved promise with it.
	if ( config && useCache ) {
		return Promise.resolve( config );
	}

	const url = createUrl( '/configuration' );

	return fetchMethod( url )
		.then( response => {
			if ( !response.ok ) {
				throw new Error();
			}
			return response.json();
		} )
		.then( json => {
			config = json;

			return config;
		} );
}
