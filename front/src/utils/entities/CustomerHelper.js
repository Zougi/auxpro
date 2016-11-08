import Validators from 'utils/form/Validators'

export default class CustomerHelper {

	static get Validators() {
		return {
			civility: Validators.NonNull,
			lastName: Validators.NonEmptyString,
			firstName: Validators.NonEmptyString,
			birthDate: Validators.NonNull,
			nationality: Validators.NonEmptyString,
			address: Validators.NonEmptyString,
			city: Validators.NonEmptyString,
			country: Validators.NonEmptyString
		}
	}

	static checkValidation(customer) {
		let validators = CustomerHelper.Validators;
		for (let v in validators) {
			console.log('here')
			console.log(v)
			let state = validators[v].getState(customer[v])
			if (state !== 'success') {
				return false;
			}
		}
		return true;
	}
}