var reg = new RegExp("^0[1-9]([-. ]?[0-9]{2}){4}$");

export default class PhoneValidator {

	static liveCheck(value) {
		if (typeof value !== 'string') {
			return '';
		} else {
			var tmp2 = '';
			for (var i = 0; i < value.length; i++) {
				var c = value.charAt(i);
				if (c === '0' || c === '1' || c === '2' || c === '3' || c === '4' ||
					c === '5' || c === '6' || c === '7' || c === '8' || c === '9') {
					tmp2 += c;
				}
			}
			var result = '';
			var l = Math.min(tmp2.length, 10);
			for (var j = 0; j < l; j++) {
				result += tmp2.charAt(j);
				if (j%2 === 1 && j !== (l - 1)) {
					result += '.';
				}
			}
			return result;
		}
	}

	static getState(value) {
		if (value || value === '') {
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