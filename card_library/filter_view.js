'use strict';

const contains = function(testValue, cardValue) {
	return cardValue && cardValue.toLowerCase().search(testValue) != -1;
};

const startsWith = function(testValue, cardValue) {
	return cardValue && cardValue.toLowerCase().startsWith(testValue);
};

class FilterView extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		const facetValuesByKey = {};
		const facetByKey = {};
		this.props.facets.forEach(facet => {
			facetValuesByKey[facet.key] = []
			facetByKey[facet.key] = facet;
		});

		this.setState({
			initialCards: this.props.cards,
			cards: this.props.cards,
			facets: this.props.facets,
			facetValuesByKey: facetValuesByKey,
			facetByKey: facetByKey,
			searchTerm: '',
			lastClickedFacetKey: null
		});
	}

	componentDidMount() {
		this.indexCards(this.state.cards, this.state.lastClickedFacetKey);
	}

	onSearch(value) {
		this.setState({
			searchTerm: value.toLowerCase()
		});

		this.filterCards(this.state.lastClickedFacetKey);
	}

	onFacetValueClick(key, value) {
		const facetValuesByKey = this.state.facetValuesByKey;
		const index = facetValuesByKey[key].indexOf(value);

		if (index == -1) {
			facetValuesByKey[key].push(value);
		} else {
			facetValuesByKey[key].splice(index, 1);
		}

		this.setState({
			facetValuesByKey: facetValuesByKey,
			lastClickedFacetKey: key
		});

		this.filterCards(key);
	}

	filterCards(lastClickedFacetKey) {
		const cardsMatchingSearchTerm = this.state.initialCards.filter(card => this.performFilter(this.state.searchTerm, card));
		const cardsMatchingFacets = cardsMatchingSearchTerm.filter(this.matchesFacets.bind(this));
		this.updateCards(cardsMatchingFacets, lastClickedFacetKey);
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

	matchesFacets(card) {
		const facetValuesByKey = this.state.facetValuesByKey;
		const facetByKey = this.state.facetByKey;

		return Object.keys(facetValuesByKey).every(key => {
			const values = facetValuesByKey[key];
			if (values.length == 0) {
				return true;
			} else {
				const facet = facetByKey[key];
				return values.some(value => facet.matches(card, value));
			}
		});
	}

	updateCards(cards, lastClickedFacetKey) {
		this.setState({
			cards: cards
		});
		this.props.onFilter(cards);
		this.indexCards(cards, lastClickedFacetKey);
	}

	indexCards(cards, lastClickedFacetKey) {
		const facets = this.state.facets;

		facets.forEach(facet => {
			if (facet.key != lastClickedFacetKey) {
				facet.clear();
			}
		});

		cards.forEach(card => {
			facets.forEach(facet => {
				if (facet.key != lastClickedFacetKey) {
					facet.indexCard(card);
				}
			})
		});

		this.setState({
			facets: facets
		});
	}

	render() {
		return React.createElement('div', {className: 'filter-container'}, [
			React.createElement(SearchBox, {
				key: 'searchBox',
				cards: this.state.initialCards,
				onSearch: this.onSearch.bind(this),
				onFilter: this.updateCards.bind(this)
			}),
			React.createElement(FacetsView, {
				key: 'facetsView',
				cards: this.state.cards,
				facets: this.state.facets,
				onFacetValueClick: this.onFacetValueClick.bind(this)
			})
		]);
	}

}