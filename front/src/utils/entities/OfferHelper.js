
let STATUS = {
	ACCEPTED: {
		bsStyle: 'success',
		title: 'Offre acceptée'
	},
	REJECTED: {
		bsStyle: 'danger',
		title: 'Offre rejetée'
	},
	PENDING: {
		bsStyle: 'info',
		title: 'Offre en attente'
	},
	EXPIRED: {
		bsStyle: 'default',
		title: 'Offre expirée'
	}
}

export default class OfferHelper {

	static getBsStyle(status) {
		let s = STATUS[status];
		if (s) {
			return STATUS[status].bsStyle;
		} 
	}

	static getTitle(status) {
		let s = STATUS[status];
		if (s) {
			return STATUS[status].title;
		} 
	}
}