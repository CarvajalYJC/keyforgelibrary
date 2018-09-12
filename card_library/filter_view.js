'use strict';

class FilterView extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const facetsByKey = {};
		this.props.facets.forEach(facet => facetsByKey[facet.key] = []);

		this.setState({
			initialCards: this.props.cards,
			cards: this.props.cards,
			facetsByKey: facetsByKey
		});
	}

	updateCards(cards) {
		this.setState({
			cards: cards
		});
		this.props.onFilter(cards);
	}

	onFacetValueClick(key, value) {
		const facetsByKey = this.state.facetsByKey;
		const index = facetsByKey[key].indexOf(value);

		if (index == -1) {
			facetsByKey[key].push(value);
		} else {
			facetsByKey[key].splice(index, 1);
		}

		this.setState({
			facetsByKey: facetsByKey
		});

		console.log(this.state.facetsByKey);
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
				facets: this.props.facets,
				onFacetValueClick: this.onFacetValueClick.bind(this)
			})
		]);
	}

}