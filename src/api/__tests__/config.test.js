import { createUrl, config } from '../config';

describe( 'config', () => {
	describe( 'createUrl', () => {
		it( 'should create proper URL for provided path and parameters', () => {
			const expected = config.baseUrl + '/movies/search?query=batman&key=' + config.key;

			expect( createUrl( '/movies/search', { query: 'batman' } ) ).toEqual( expected );
		} );
	} );
} );
