'use strict';

class Application extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.setState({
			initialCards: this.props.cards,
			cards: this.props.cards
		});
	}

	updateCards(cards) {
		this.setState({
			cards: cards
		});
	}

	render() {
		return React.createElement('div', {className: 'container'}, [
			React.createElement(CardFilter, {key: 'cardFilter', cards: this.state.initialCards, onFilter: this.updateCards.bind(this)}),
			React.createElement(DeckView, {key: 'deckView', cards: this.state.cards})
		]);
	}

}

const domContainer = document.querySelector('#application');
ReactDOM.render(React.createElement(Application, {cards: keyforgeCards}), domContainer);