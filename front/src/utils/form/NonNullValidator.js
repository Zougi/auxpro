import ValidatorBase from 'utils/form/ValidatorBase'

export default class NonNullValidator extends ValidatorBase {

	constructor(props) {
		super(props)
		this.msgSuccess = '';
		this.msgError = '';
	}

	getState(value) {
		if (value !== null && !(typeof value === 'undefined')) {
			return 'success';
		} else {
			return 'error';
		}
	}
}