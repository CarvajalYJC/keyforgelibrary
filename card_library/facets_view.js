'use strict';

const FACETS = [{
	type: 'facet',
	name: 'Chains',
	prop: 'chains'
}, {
	type: 'facet',
	name: 'Friendly Capture Aember',
	prop: 'fr_capture_aember'
}, {
	type: 'facet',
	name: 'Friendly Gain Aember',
	prop: 'fr_gain_aember'
}, {
	type: 'facet',
	name: 'Friendly Lose Aember',
	prop: 'fr_lose_aember'
}, {
	type: 'facet',
	name: 'Friendly Move Aember',
	prop: 'fr_move_aember'
}, {
	type: 'facet',
	name: 'Friendly Steal Aember',
	prop: 'fr_steal_aember'
}, {
	type: 'facet',
	name: 'Opponent Capture Aember',
	prop: 'op_capture_aember'
}, {
	type: 'facet',
	name: 'Opponent Gain Aember',
	prop: 'op_gain_aember'
}, {
	type: 'facet',
	name: 'Opponent Lose Aember',
	prop: 'op_lose_aember'
}, {
	type: 'facet',
	name: 'Opponent Steal Aember',
	prop: 'op_steal_aember'
}];

class FacetsView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const elements = this.generateFacetElements(this.indexCards(FACETS), FACETS);
		return React.createElement('div', {className: 'facets-container'}, elements);
	}

	generateFacetElements(index, configObjects) {
		const elements = [];

		FACETS.forEach(configObject => {
			elements.push(React.createElement('li', {
				className: 'facet-value', 
				key: configObject.name
			}, `${configObject.name} (${index[configObject.prop]})`));
		});

		return React.createElement('ul', {key: 'facets'}, elements);
	}

	indexCards(configObjects) {
		const facetProperties = this.getListOfFacetProperties(configObjects);
		const index = {};

		facetProperties.forEach(prop => {
			index[prop] = 0;
		});

		this.props.cards.forEach(card => {
			facetProperties.forEach(prop => {
				if (card[prop]) {
					index[prop] = index[prop] + 1;
				}
			});
		});

		return index;
	}

	getListOfFacetProperties(configObjects) {
		const facetProperties = [];

		configObjects.forEach(configObject => {
			facetProperties.push(configObject.prop);
		});

		return facetProperties;
	}

}