let ONE = { key: 'ONE', value: 'Une seule date' }
let P1W = { key: 'P1W', value: 'Hebdomadaire', days: 7 }
let P2W = { key: 'P2W', value: 'Une semaine sur deux', days: 14 }
let P3W = { key: 'P3W', value: 'Une semaine sur trois', days: 21 }
let P4W = { key: 'P4W', value: 'Une semaine sur quatre', days: 28 }

export default class Period {

	static get ONE() { return ONE; }
	static get P1W() { return P1W; }
	static get P2W() { return P2W; }
	static get P3W() { return P3W; }
	static get P4W() { return P4W; }

	static get PERIODS() { return [ ONE, P1W, P2W, P3W, P4W ];}

	static getPeriod(id) {
		return Period[id.toUpperCase()];
	}
}