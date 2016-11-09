export default class CustomValidator {

	constructor(props) {
		this.lengthMin = props.lengthMin;
		this.lengthMax = props.lengthMax;
		this.regSuccess = props.regSuccess;
		this.regWarning = props.regWarning;
		this.masSuccess = props.msgSuccess;
		this.msgWarning = props.msgWarning;
		this.msgError   = props.msgError;
	}

	getState(value) {
		let v = String(value)
		var l = v.length;
		var isMinOk = this.lengthMin ? l >= this.lengthMin : true;
		var isMaxOk = this.lengthMax ? l <= this.lengthMax : true;
		if (!isMinOk || !isMaxOk) {
			return 'error';
		}
		if (this.regSuccess.test(v)) {
			return 'success';
		} else if (this.regWarning && this.regWarning.test(v)) {
			return 'warning';
		} 
		return 'error';
	}

	getMessage(value) {
		var s = getState(value);
		switch (s) {
			case 'success': return this.msgSuccess || '';
			case 'warning': return this.msgWarning || '';
			case 'error'  : return this.msgError || '';
		}
		return '';
	}

	getBlockedValue(value) {
		let v = String(value)
		if (this.lengthMax && v.length > this.lengthMax) {
			v = v.substr(0, this.lengthMax)
			if (typeof value === 'number') {
				return Number(v)
			}
			return v;
		}
		return value;
	}
}