'use strict';

/**
{
	key: 'house',
	label: 'House',
	type: 'value'
}
**/
class ValueFacet {

	constructor({key, label, emptyKey = 'Empty'}) {
		this.key = key;
		this.label = label;
		this.emptyKey = emptyKey;
		this.index = {};
	}

	reset() {
		this.index = {};
	}

	indexCard(card) {
		const key = card[this.key] || this.emptyKey;
		if (!this.index[key]) {
			this.index[key] = 0;
		}

		this.index[key] = this.index[key] + 1;
	}

	matches(card, value) {
		if (card[this.key] == value) {
			return true;
		} else if (value == this.emptyKey && !card[this.key]) {
			return true;
		} else {
			return false;
		}
	}

	getIndexedValues() {
		const indexedValues = Object.keys(this.index).map(value => {
			return {
				key: this.key,
				value: value,
				count: this.index[value]
			};
		});

		return indexedValues.sort((a, b) => a.value.localeCompare(b.value));
	}

}

class ArrayFacet extends ValueFacet {

	constructor(props) {
		super(props)
	}

	indexCard(card) {
		const keysString = card[this.key] || this.emptyKey;
		const keys = keysString.split(',').map(it => it.trim());
		keys.forEach(key => {
			if (!this.index[key]) {
				this.index[key] = 0;
			}

			this.index[key] = this.index[key] + 1;
		});
	}

	matches(card, value) {
		if (value == this.emptyKey && !card[this.key]) {
			return true;
		} else {
			const keys = card[this.key] || null;
			if (keys && Array.isArray(keys)) {
				return keys.indexOf(value) != -1;
			} else {
				return false;
			}
		}
	}

}

const FACETS = [
	new ValueFacet({key: 'house', label: 'House'}),
	new ValueFacet({key: 'type', label: 'Card Type'}),
	new ValueFacet({key: 'rarity', label: 'Rarity'}),
	new ValueFacet({key: 'aember', label: 'Aember'}),
	new ArrayFacet({key: 'traits', label: 'Trait'})
];