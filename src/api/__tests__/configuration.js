/* global jest, window */

import { createUrl } from '../config';
import configuration from '../configuration';

describe( 'search', () => {
	const resultData = { foo: 'bar' };
	let isResponseOk;
	let fetchMock;

	beforeEach( () => {
		isResponseOk = true;

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

		return configuration( false ).then( result => {
			expect( fetchMock.mock.calls.length ).toEqual( 1 );
			expect( fetchMock.mock.calls[ 0 ][ 0 ] ).toEqual( createUrl( '/configuration' ) );
			expect( result ).toEqual( resultData );

			window.fetch = originalFetch;
		} );
	} );

	it( 'should use cashed responses as default', () => {
		// Replace window.fetch for a moment to check if it is called properly.
		const originalFetch = window.fetch;
		window.fetch = fetchMock;

		return configuration().then( result => {
			expect( result ).toEqual( resultData );

			window.fetch = originalFetch;
		} );
	} );

	it( 'should use passed function', () => {
		return configuration( false, fetchMock ).then( result => {
			expect( fetchMock.mock.calls.length ).toEqual( 1 );
			expect( fetchMock.mock.calls[ 0 ][ 0 ] ).toEqual( createUrl( '/configuration' ) );
			expect( result ).toEqual( resultData );
		} );
	} );

	it( 'should should trow an error when response is not ok', () => {
		isResponseOk = false;
		expect.assertions( 1 );

		return configuration( false, fetchMock ).catch( e => {
			expect( e ).toBeInstanceOf( Error );
		} );
	} );

	it( 'should return value from cache if requested', () => {
		return configuration( false, fetchMock ).then( () => {
			expect( fetchMock.mock.calls.length ).toEqual( 1 );

			return configuration( true, fetchMock ).then( result => {
				expect( fetchMock.mock.calls.length ).toEqual( 1 );
				expect( result ).toEqual( resultData );
			} );
		} );
	} );
} );
