'use strict';

class SearchBox extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement('div', {className: 'search-box'}, [
			React.createElement('input', {
				className: 'search-input', 
				key: 'search-input',
				placeholder: 'Search...',
				onKeyUp: this.onKeyUp.bind(this)
			})
		]);
	}

	onKeyUp(event) {
		this.props.onSearch(event.target.value);
	}

	filterList(event) {
		const value = event.target.value.toLowerCase();
		const filteredCards = this.props.cards.filter(card => this.performFilter(value, card));

		this.props.onFilter(filteredCards);
	}

}