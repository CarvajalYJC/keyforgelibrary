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
				onChange: this.onChange.bind(this)
			}),
			React.createElement('button', {
				type: 'button',
				className: 'fa fa-search search-button',
				key: 'search-button'
			})
		]);
	}

	onChange(event) {
		this.props.onSearch(event.target.value);
	}

	filterList(event) {
		const value = event.target.value.toLowerCase();
		const filteredCards = this.props.cards.filter(card => this.performFilter(value, card));

		this.props.onFilter(filteredCards);
	}

	performFilter(value, card) {
		return contains(value, card.name)
			|| startsWith(value, card.id)
			|| startsWith(value, card.house)
			|| startsWith(value, card.type)
			|| startsWith(value, card.rarity)
			|| contains(value, card.traits)
			|| contains(value, card.text);
	}

}