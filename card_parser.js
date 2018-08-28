'use strict';


const COLUMNS = {
	"1": "id",
	"2": "name",
	"3": "house",
	"4": "rarity",
	"5": "type",
	"6": "aember",
	"7": "traits",
	"8": "power",
	"9": "armor",
	"10": "text",
	"11": "chains",
	"12": "maverick",
	"13": "special",
	"14": "img"
};

const keyforgeCards = [];

function parseCards(json) {
	const data = json.feed.entry;
	let currentRow = "0";
	let currentObj = null;

	data.forEach(entry => {
		const cell = entry['gs$cell'];
		if (cell.row != "1") {
			if (currentRow != cell.row) {
				if (currentObj != null) {
					keyforgeCards.push(Object.assign({}, currentObj));
				}
				currentObj = {};
				currentRow = cell.row;
			}

			currentObj[COLUMNS[cell.col]] = cell['$t'];
		}
	});

	keyforgeCards.push(Object.assign({}, currentObj));
}