let PENDING   = { key: 'PENDING', value: 'Planifiée', bsStyle: 'info' }
let CANCELED  = { key: 'CANCELED', value: 'Annulée', bsStyle: 'danger' }
let COMPLETED = { key: 'COMPLETED', value: 'Realisée', bsStyle: 'success' }

export default class MissionStatus {

	static get PENDING() { return PENDING; }
	static get CANCELED() { return CANCELED; }
	static get COMPLETED() { return COMPLETED; }

	static get STATUSES() { return [
		PENDING,
		CANCELED,
		COMPLETED
	];}

	static getStatus(id) {
		return MissionStatus[id.toUpperCase()];
	}
}