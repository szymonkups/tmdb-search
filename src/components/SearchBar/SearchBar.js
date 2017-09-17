import React, { Component } from 'react';
import './SearchBar.css';

/**
 * Displays search bar and a button. Also error messages are shown by this component.
 */
class SearchBar extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			value: ''
		};

		this.handleSearchButtonClick = this.handleSearchButtonClick.bind( this );
		this.handleValueChange = this.handleValueChange.bind( this );
		this.handleKeyPress = this.handleKeyPress.bind( this );
	}

	/**
	 * Called when input value is changed.
	 */
	handleValueChange( event ) {
		this.setState( { value: event.target.value } );
	}

	/**
	 * Called when search button is clicked.
	 */
	handleSearchButtonClick() {
		const value = this.state.value;

		if ( value !== '' ) {
			this.props.onChange( this.state.value );
		}
	}

	/**
	 * Called when key is pressed inside text input. Used to submit new query when enter is pressed.
	 */
	handleKeyPress( event ) {
		if ( event.key === 'Enter' ) {
			this.handleSearchButtonClick();
		}
	}

	render() {
		const errorMessage = this.props.error ? <div className="error-message">{ this.props.error }</div> : null;

		return (
			<div className="search row">
				<input
					onChange={ this.handleValueChange }
					onKeyPress={ this.handleKeyPress }
					value={ this.state.value }
					className="search__input col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4"
					type="text"
					placeholder="Search TMDb..." />
				<button
					onClick={ this.handleSearchButtonClick }
					className="search__button">
					<i className="fa fa-search" aria-hidden="true"></i>
				</button>
				{ errorMessage }
			</div>
		);
	}
}

export default SearchBar;
