'use strict';

class Facet {

	constructor({name}) {
		this.name = name;
		this.index = {};
	}

	reset() {
		this.index = {};
	}

	indexCard(card) {
		throw new Error('Need to override indexCard() in implementation!');
	}

	getIndexedValues() {
		const values = Object.keys(this.index).map(key => {
			return {name: key, count: this.index[key]};
		});

		return values.sort((a, b) => a.name.localeCompare(b.name));
	}

}

class BooleanFacet extends Facet {

	constructor(config) {
		super(config);
		this.prop = config.prop;
		this.trueName = config.trueName;
		this.falseName = config.falseName;
		this.reset();
	}

	reset() {
		super.reset();
		this.index[this.trueName] = 0;
		this.index[this.falseName] = 0;
	}

	indexCard(card) {
		if (card[this.prop]) {
			this.index[this.trueName] = this.index[this.trueName] + 1;
		} else {
			this.index[this.falseName] = this.index[this.falseName] + 1;
		}
	}

}

const FACETS = [
	new BooleanFacet({name: 'Resources', prop: 'img', trueName: 'Has Image', falseName: 'No Image'})
];