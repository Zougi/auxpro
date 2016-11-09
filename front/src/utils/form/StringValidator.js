export default class StringValidator {

	constructor(props) {
		this.lengthMin = Number(props.lengthMin);
		this.lengthMax = Number(props.lengthMax);
	}

	getState(value) {
		if (value || value === '') {
			var l = value.length;
			var isMinOk = !isNaN(this.lengthMin) ? l >= this.lengthMin : true;
			var isMaxOk = !isNaN(this.lengthMax) ? l <= this.lengthMax : true;
			if (isMinOk && isMaxOk) {
				return 'success';
			} 
		}
		return 'error';
	}

	getMessage(value) {
		var state = getState(value);
		switch (state) {
			case 'success':
				return state;
				break;
			case 'warning':
				return state;
				break;
			case 'error':
				return state;
				break;
		}
	}

	getBlockedValue(value) {
		if (this.lengthMax && value.length > this.lengthMax) {
			return value.substr(0, this.lengthMax);
		}
		return value;
	}
}