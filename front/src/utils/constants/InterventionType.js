let PENDING = { key: 'PENDING', value: 'Prestation'}
let OFFERED = { key: 'OFFERED', value: 'Offre envoyée', bsStyle: 'info' }
let PLANNED = { key: 'PLANNED', value: 'Intervention', bsStyle: 'success' }

export default class InterventionType {

	static get PENDING() { return PENDING; }
	static get OFFERED() { return OFFERED; }
	static get PLANNED() { return PLANNED; }

	static get TYPES() { return [
		PENDING,
		OFFERED,
		PLANNED
	];}

	static get(id) {
		return InterventionType[id.toUpperCase()];
	}

	static getFromIntervention(intervention) {
		if (intervention.auxiliaryId) {
			return PLANNED;
		} else if (intervention.offers && intervention.offers.length) {
			return OFFERED;
		}
		return PENDING;
	}
}