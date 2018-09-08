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
	"14": "img",
	"15": "op_lose_aember",
	"16": "op_steal_aember",
	"17": "op_capture_aember",
	"18": "op_gain_aember",
	"19": "fr_lose_aember",
	"20": "fr_steal_aember",
	"21": "fr_capture_aember",
	"22": "fr_gain_aember",
	"23": "fr_move_aember"
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