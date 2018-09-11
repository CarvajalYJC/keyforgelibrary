'use strict';

class FacetView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const facetValues = this.props.values.map(value => {
			return React.createElement('li', {className: 'facet-value', key: value.name}, `${value.name} (${value.count})`);
		});

		return React.createElement('div', {className: 'facet'}, [
			React.createElement('div', {className: 'facet-name', key: 'facetName'}, this.props.name),
			React.createElement('ul', {className: 'facet-values', key: 'facetValues'}, facetValues)
		]);
	}

}

class FacetsView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const facetViews = this.constructFacetViews();
		return React.createElement('div', {className: 'facets-container'}, facetViews);
	}

	constructFacetViews() {
		this.indexCards();

		return this.props.facets.map(facet => {
			return React.createElement(FacetView, {key: facet.name, name: facet.name, values: facet.getIndexedValues()});
		});
	}

	indexCards() {
		this.props.facets.forEach(facet => facet.reset());

		this.props.cards.forEach(card => {
			this.props.facets.forEach(facet => {
				facet.indexCard(card);
			})
		});
	}

}
