'use strict';

const contains = function(testValue, cardValue) {
	return cardValue && cardValue.toLowerCase().search(testValue) != -1;
};

const startsWith = function(testValue, cardValue) {
	return cardValue && cardValue.toLowerCase().startsWith(testValue);
};

class CardFilter extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement('div', {className: 'filter-container'}, [
			React.createElement('div', {className: 'search-box', key: 'search-box'}, [
				React.createElement('input', {className: 'card-filter', key: 'card-filter', onChange: this.filterList.bind(this)}),
				React.createElement('span', {key: 'span'})
			])
		]);
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