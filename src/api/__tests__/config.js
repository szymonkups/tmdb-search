import { createUrl, config } from '../config';

describe( 'config', () => {
	describe( 'createUrl', () => {
		it( 'should create proper URL for provided path and parameters', () => {
			const expected = config.baseUrl + '/movies/search?query=batman&api_key=' + config.key;

			expect( createUrl( '/movies/search', { query: 'batman' } ) ).toEqual( expected );
		} );

		it( 'should create proper URL if no param object is provided', () => {
			const expected = config.baseUrl + '/movies/search?api_key=' + config.key;

			expect( createUrl( '/movies/search' ) ).toEqual( expected );
		} );
	} );
} );
