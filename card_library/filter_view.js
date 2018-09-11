'use strict';

class FilterView extends React.Component {

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
		this.props.onFilter(cards);
	}

	render() {
		return React.createElement('div', {className: 'filter-container'}, [
			React.createElement(SearchBox, {
				key: 'searchBox',
				cards: this.state.initialCards,
				onFilter: this.updateCards.bind(this)
			}),
			React.createElement(FacetsView, {
				key: 'facetsView',
				cards: this.state.cards,
				facets: this.props.facets
			})
		]);
	}

}