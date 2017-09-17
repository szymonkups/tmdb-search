/* global jest */

import SearchModel from '../SearchModel';
import searchApi from '../../api/search';
import configurationApi from '../../api/configuration';

describe( 'SearchModel', () => {
	let page, results, totalPages, totalResults, searchApiMock, configurationApiMock, lastQuery, lastPage, searchModel,
		changeCallback, errorCallback;

	beforeEach( () => {
		page = 1;
		results = [ {
			title: 'title',
			id: 999,
			overview: 'overview',
			poster_path: 'foo.png',
			vote_average: 777,
			release_date: '01-01-2001'
		} ];

		totalPages = 2;
		totalResults = 20;

		searchApiMock = ( query, page ) => {
			lastQuery = query;
			lastPage = page;

			return Promise.resolve( {
				page, results, total_pages: totalPages, total_results: totalResults
			} );
		};

		configurationApiMock = () => Promise.resolve( {
			images: {
				poster_sizes: [ 'w32', 'w92' ],
				base_url: 'http://images.com'
			}
		} );

		changeCallback = jest.fn();
		errorCallback = jest.fn();

		searchModel = new SearchModel( changeCallback, errorCallback, configurationApiMock, searchApiMock );
	} );

	it( 'should return search results using search api', () => {
		searchModel.query = 'foo bar baz';

		return searchModel.getNextPage().then( () => {
			expect( searchModel.page ).toEqual( 1 );
			expect( searchModel.totalPages ).toEqual( 2 );
			expect( searchModel.results.length ).toEqual( 1 );
			expect( changeCallback.mock.calls.length ).toEqual( 1 );
		} );
	} );

	it( 'should return next pages concatenated to the previous', () => {
		searchModel.query = 'foo bar baz';

		return searchModel.getNextPage().then( () => {
			expect( searchModel.page ).toEqual( 1 );
			expect( searchModel.totalPages ).toEqual( 2 );
			expect( searchModel.results.length ).toEqual( 1 );

			return searchModel.getNextPage().then( () => {
				expect( searchModel.results.length ).toEqual( 2 );
			} );
		} );
	} );

	it( 'should call error callback when something is wrong with API communication', done => {
		searchApiMock = () => new Promise( () => {
			throw new Error();
		} );

		searchModel = new SearchModel( changeCallback, e => {
			expect( e ).toBeInstanceOf( Error );
			done();
		}, configurationApiMock, searchApiMock );

		searchModel.query = 'foo bar';
		expect.assertions( 1 );

		searchModel.getNextPage();
	} );

	it( 'should use default search and configuration API', () => {
		searchModel = new SearchModel( changeCallback, errorCallback );

		expect( searchModel._searchApi ).toEqual( searchApi );
		expect( searchModel._configurationApi ).toEqual( configurationApi );
	} );
} );
