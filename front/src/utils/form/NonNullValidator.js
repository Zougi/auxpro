export default class NonNullValidator {

	static getState(value) {
		if (value !== null && !(typeof value === 'undefined')) {
			return 'success';
		} else {
			return 'error';
		}
	}

	static getMessage(value) {
		if (getState(value) === 'success') {
			return 'Veuillez saisir une valeur valide';
		} else {
			return '';
		}
	}
}