'use strict';

class FacetView extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const label = this.props.facet.label;
		const values = this.props.facet.getIndexedValues();
		const facetValues = [];

		values.forEach(value => {
			facetValues.push(React.createElement('label', {
				key: `label::${value.key}:${value.value}`,
				className: `facet-value ${value.count == 0 ? 'facet-value-empty' : ''}`
			}, [
				React.createElement('input', {
					key: `${value.key}:${value.value}`,
					type: 'checkbox',
					name: value.key,
					value: value.value,
					onClick: this.props.onFacetValueClick
				}),
				React.createElement('span', {
					key: `span:${value.key}:${value.value}`,
					className: 'facet-text'
				}, `${value.value} (${value.count})`)
			]));
			facetValues.push(React.createElement('br', {key: `br:${value.key}:${value.value}`}));
		});

		return React.createElement('div', {className: 'facet'}, [
			React.createElement('div', {className: 'facet-name', key: 'facetName'}, label),
			React.createElement('div', {className: 'facet-values', key: 'facetValues'}, facetValues)
		]);
	}

}

class FacetsView extends React.Component {

	constructor(props) {
		super(props);
	}

	onFacetValueClick(event) {
		const key = event.target.name;
		const value = event.target.value;

		this.props.onFacetValueClick(key, value);
	}

	render() {
		const facetViews = this.constructFacetViews();
		return React.createElement('div', {className: 'facets-container'}, facetViews);
	}

	constructFacetViews() {
		return this.props.facets.map(facet => {
			return React.createElement(FacetView, {key: facet.key, facet: facet, onFacetValueClick: this.onFacetValueClick.bind(this)});
		});
	}

}
