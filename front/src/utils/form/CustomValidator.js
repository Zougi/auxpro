export default class CustomValidator {

	constructor(props) {
		this.regSuccess = props.regSuccess;
		this.regWarning = props.regWarning;
		this.masSuccess = props.msgSuccess;
		this.msgWarning = props.msgWarning;
		this.msgError   = props.msgError;
	}

	getState(value) {
		if (value || value === '') {
			if (this.regSuccess.test(value)) {
				return 'success';
			} else if (this.regWarning && this.regWarning.test(value)) {
				return 'warning';
			} 
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
}