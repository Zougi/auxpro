var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class EmailValidator {

	static getState(value) {
		if (reg.test(value)) {
			return 'success';
		} else {
			return 'error';
		}
	}

	static getMessage(value) {
		if (getState(value) === 'success') {
			return 'Veuillez saisir une addresse électronique valide';
		} else {
			return '';
		}
	}
}