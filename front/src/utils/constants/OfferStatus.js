let PENDING  = { key: 'PENDING', value: 'En attente', bsStyle: 'default' }
let ACCEPTED = { key: 'ACCEPTED', value: 'Acceptée', bsStyle: 'success' }
let REJECTED = { key: 'REJECTED', value: 'Rejetée', bsStyle: 'danger' }
let EXPIRED  = { key: 'EXPIRED', value: 'Expirée', bsStyle: 'warning' }

export default class OfferStatus {

	static get PENDING() { return PENDING; }
	static get ACCEPTED() { return ACCEPTED; }
	static get REJECTED() { return REJECTED; }
	static get EXPIRED() { return EXPIRED; }

	static get STATUSES() { return [
		PENDING,
		ACCEPTED,
		REJECTED,
		EXPIRED
	];}

	static getStatus(id) {
		return OfferStatus[id.toUpperCase()];
	}
}