let PENDING   = { key: 'PENDING', value: 'En attente' }
let ACCEPTED  = { key: 'ACCEPTED', value: 'Acceptée', bsStyle: 'success' }
let DECLINED  = { key: 'DECLINED', value: 'Déclinée', bsStyle: 'danger' }
let CONFIRMED = { key: 'REJECTED', value: 'Confirmée', bsStyle: 'success' }
let REJECTED  = { key: 'REJECTED', value: 'Rejetée', bsStyle: 'danger' }
let EXPIRED   = { key: 'EXPIRED', value: 'Expirée', bsStyle: 'expired' }

export default class OfferStatus {

	static get PENDING() { return PENDING; }
	static get ACCEPTED() { return ACCEPTED; }
	static get DECLINED() { return DECLINED; }
	static get CONFIRMED() { return CONFIRMED; }
	static get REJECTED() { return REJECTED; }
	static get EXPIRED() { return EXPIRED; }

	static get STATUSES() { return [
		PENDING,
		ACCEPTED,
		DECLINED,
		CONFIRMED,
		REJECTED,
		EXPIRED
	];}

	static getStatus(id) {
		return OfferStatus[id.toUpperCase()];
	}
}