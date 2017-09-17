import MovieModel from '../MovieModel';

describe( 'MovieModel', () => {
	let config;

	beforeEach( () => {
		config = {
			images: {
				poster_sizes: [ 'w32', 'w92' ],
				base_url: 'http://images.com'
			}
		};
	} );

	it( 'should parse object in format returned from TMDb', () => {
		const movieModel = new MovieModel( {
			title: 'title',
			id: 999,
			overview: 'overview',
			poster_path: 'foo.png',
			vote_average: 777,
			release_date: '01-01-2001'
		}, config );

		expect( movieModel.title ).toEqual( 'title' );
		expect( movieModel.id ).toEqual( 999 );
		expect( movieModel.overview ).toEqual( 'overview' );
		expect( movieModel.voteAverage ).toEqual( 777 );
		expect( movieModel.releaseDate ).toEqual( '01-01-2001' );
		expect( movieModel.posterUrl ).toEqual( 'http://images.com/w92/foo.png' );
	} );

	it( 'should return undefined as posterUrl if correct size is not present', () => {
		config.images.poster_sizes = [ 'w32', 'w99' ];

		const movieModel = new MovieModel( {
			title: 'title',
			id: 999,
			overview: 'overview',
			poster_path: 'foo.png',
			vote_average: 777,
			release_date: '01-01-2001'
		}, config );

		expect( movieModel.posterUrl ).toBeUndefined();
	} );

	it( 'should return undefined if there is no poster in movie details', () => {
		const movieModel = new MovieModel( {
			title: 'title',
			id: 999,
			overview: 'overview',
			vote_average: 777,
			release_date: '01-01-2001'
		}, config );

		expect( movieModel.posterUrl ).toBeUndefined();
	} );
} );
