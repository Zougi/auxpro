var reg = new RegExp("^[0-9]{*}$");

export default class NumberValidator {

	static getState(value) {
		if (value || value === 0) {
			if (reg.test(value)) {
				return 'success';
			}
		}
		return 'error';
	}

	static getMessage(value) {
		if (getState(value) === 'success') {
			return 'Veuillez saisir un numéro de téléphone valide';
		} else {
			return '';
		}
	}
}