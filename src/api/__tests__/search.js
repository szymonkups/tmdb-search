/* global jest, window */

import { createUrl } from '../config';
import search from '../search';

describe( 'search', () => {
	const resultData = { foo: 'bar' };
	let isResponseOk = true;
	let fetchMock;

	beforeEach( () => {
		// Mocked fetch method used during tests.
		// Could use sinon.js but for simple mocks jest is fine.
		fetchMock = jest.fn().mockImplementation( () => {
			return Promise.resolve( {
				ok: isResponseOk,
				json: () => resultData
			} );
		} );
	} );

	it( 'should use window.fetch as default request method and pass params to it', () => {
		// Replace window.fetch for a moment to check if it is called properly.
		const originalFetch = window.fetch;
		window.fetch = fetchMock;

		return search( 'foo bar', 1 ).then( result => {
			expect( fetchMock.mock.calls.length ).toEqual( 1 );
			expect( fetchMock.mock.calls[ 0 ][ 0 ] ).toEqual( createUrl( '/search/movie', { query: 'foo bar', page: 1 } ) );
			expect( result ).toEqual( resultData );

			window.fetch = originalFetch;
		} );
	} );

	it( 'should use window.fetch as default request method and pass params to it', () => {
		// Replace window.fetch for a moment to check if it is called properly.
		const originalFetch = window.fetch;
		window.fetch = fetchMock;

		return search( 'foo bar', 1 ).then( result => {
			expect( fetchMock.mock.calls.length ).toEqual( 1 );
			expect( fetchMock.mock.calls[ 0 ][ 0 ] ).toEqual( createUrl( '/search/movie', { query: 'foo bar', page: 1 } ) );
			expect( result ).toEqual( resultData );

			window.fetch = originalFetch;
		} );
	} );

	it( 'should use passed function', () => {
		return search( 'foo bar', 1, fetchMock ).then( result => {
			expect( fetchMock.mock.calls.length ).toEqual( 1 );
			expect( fetchMock.mock.calls[ 0 ][ 0 ] ).toEqual( createUrl( '/search/movie', { query: 'foo bar', page: 1 } ) );
			expect( result ).toEqual( resultData );
		} );
	} );

	it( 'should should trow an error when response is not ok', () => {
		isResponseOk = false;
		expect.assertions( 1 );

		return search( 'foo bar', 1, fetchMock ).catch( e => {
			expect( e ).toBeInstanceOf( Error );
		} );
	} );
} );
