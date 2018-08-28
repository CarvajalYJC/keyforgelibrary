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
		return React.createElement('input', {className: 'card-filter', placeholder: 'Search...', onChange: this.filterList.bind(this)});
	}

	filterList(event) {
		const value = event.target.value.toLowerCase();
		const filteredCards = this.props.cards.filter(card => this.performFilter(value, card));

		this.props.onFilter(filteredCards);
	}

	performFilter(value, card) {
		return contains(value, card.name)
			|| startsWith(value, card.house)
			|| startsWith(value, card.type)
			|| startsWith(value, card.rarity)
			|| contains(value, card.traits)
			|| contains(value, card.text);
	}

}