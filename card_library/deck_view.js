'use strict';

class CardView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const card = this.props.card;
		return React.createElement('div', {className: 'card-container'}, [
			React.createElement('div', {className: 'card u-clearfix', key: 'card'}, [
				React.createElement('div', {className: 'card-body', key: 'card-body'}, [
					React.createElement('span', {className: 'card-number card-circle subtle', key: 'card-number'}, `${card.id}`),
					React.createElement('span', {className: 'card-house subtle', key: 'card-house'}, `${card.house}`),
					React.createElement('h2', {className: 'card-title', key: 'card-title'}, `${card.name}`),
					React.createElement('span', {className: 'card-description subtle', key: 'card-description'}, `${card.text}`),
					React.createElement('div', {className:  `card-type card-type-${card.type.toLowerCase()}`, key: 'card-type'}, `${card.type}`),
					React.createElement('span', {className: 'card-rarity card-circle subtle', key: 'card-rarity'}, 'R')
				]),
				React.createElement('img', {src: `${card.img}`, height: 438, width: 300, className: 'card-media', key: 'card-media'})
			]),
			React.createElement('div', {className: 'card-shadow', key: 'card-shadow'})
		]);
	}

}

class DeckView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const cardViews = this.props.cards.map(card => {
			return React.createElement(CardView, {card: card, key: `card-${card.id}`});
		});
		return React.createElement('div', {className: 'deck-container'}, cardViews);
	}

}