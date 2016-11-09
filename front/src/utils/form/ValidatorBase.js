/**
 *
 */
export default class ValidatorBase {

	// Handled validation states 
	static get STATES() {
		return {
			INFO:    'info',
			SUCCESS: 'success',
			WARNING: 'warning',
			ERROR:   'error'
		};
    }

	constructor(props) {
		props = props || {};
		// For validator using reg exp only
		this.regSuccess = props.regSuccess;
		this.regInfo    = props.regInfo;
		this.regWarning = props.regWarning;
		// For all validators 
		this.msgInfo    = props.msgInfo;
		this.msgSuccess = props.msgSuccess;
		this.msgWarning = props.msgWarning;
		this.msgError   = props.msgError;
	}

	getState(value) {
		return STATES.SUCCESS;
	}

	getBlockedValue(value) {
		return value;
	}

	getMessage(value) {
		var s = getState(value);
		switch (s) {
			case STATES.SUCCESS: return this.msgSuccess || '';
			case STATES.INFO: return this.msgInfo || '';
			case STATES.WARNING: return this.msgWarning || '';
			case STATES.ERROR: return this.msgError || '';
		}
		return '';
	}
	
}