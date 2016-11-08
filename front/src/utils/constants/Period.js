let P1W = { key: 'P1W', value: 'Hebdomadaire' }
let P2W = { key: 'P2W', value: 'Une semaine sur deux' }
let P3W = { key: 'P3W', value: 'Une semaine sur trois' }
let P4W = { key: 'P4W', value: 'Une semaine sur quatre' }

export default class Period {

	static get P1W() { return P1W; }
	static get P2W() { return P2W; }
	static get P3W() { return P3W; }
	static get P4W() { return P4W; }

	static get PERIODS() { return [ P1W, P2W, P3W, P4W ];}

	static getPeriod(id) {
		return Period[id.toUpperCase()];
	}
}