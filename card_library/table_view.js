'use strict';

class TableRow extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const card = this.props.card;
		return React.createElement('tr', {"data-card-id": card.id}, [
			React.createElement('td', {key: `cardNumber-${card.id}`}, card.id),
			React.createElement('td', {key: `cardHouse-${card.id}`}, card.house),
			React.createElement('td', {key: `cardName-${card.id}`, className: 'no-wrap'}, card.name),
			React.createElement('td', {key: `cardType-${card.id}`}, card.type),
			React.createElement('td', {key: `cardRarity-${card.id}`}, card.rarity),
			React.createElement('td', {key: `cardAember-${card.id}`}, card.aember),
			React.createElement('td', {key: `cardTraits-${card.id}`, className: 'no-wrap'}, card.traits),
			React.createElement('td', {key: `cardPower-${card.id}`}, card.power),
			React.createElement('td', {key: `cardArmor-${card.id}`}, card.armor),
			React.createElement('td', {key: `cardText-${card.id}`}, card.text)
		]);
	}

}

class TableBody extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const rows = this.props.cards.map(card => {
			return React.createElement(TableRow, {key: `card-${card.id}`, card: card})
		});
		return React.createElement('tbody', {}, rows);
	}

}

class TableHeader extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement('thead', {}, [
			React.createElement('tr', {key: 'headerRow'}, [
				React.createElement('th', {key: 'cardNumber'}, '#'),
				React.createElement('th', {key: 'cardHouse'}, 'House'),
				React.createElement('th', {key: 'cardName'}, 'Name'),
				React.createElement('th', {key: 'cardType'}, 'Type'),
				React.createElement('th', {key: 'cardRarity'}, 'Rarity'),
				React.createElement('th', {key: 'cardAember'}, 'Aember'),
				React.createElement('th', {key: 'cardTraits'}, 'Traits'),
				React.createElement('th', {key: 'cardPower'}, 'Power'),
				React.createElement('th', {key: 'cardArmor'}, 'Armor'),
				React.createElement('th', {key: 'cardText'}, 'Text')
			])
		]);
	}

}

class TableView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return React.createElement('table', {}, [
			React.createElement(TableHeader, {key: 'tableHeader'}),
			React.createElement(TableBody, {key: 'tableBody', cards: this.props.cards})
		]);
	}

}