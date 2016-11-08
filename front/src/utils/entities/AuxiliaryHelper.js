import Validators from 'utils/form/Validators'

export default class AuxiliaryHelper {

	static get ProfileValidators() {
		return {
			civility: Validators.NonNull,
			lastName: Validators.NonEmptyString,
			firstName: Validators.NonEmptyString,
			birthDate: Validators.NonNull,
			birthCity: Validators.NonEmptyString,
			birthCountry: Validators.NonEmptyString,
			nationality: Validators.NonEmptyString,
			socialNumber: Validators.SocialNumber,
			ciNumber: Validators.IDCardNumber,
			address: Validators.NonEmptyString,
			phone: Validators.Phone,
			email: Validators.Email,
			entrepreneur: Validators.NonNull,
			diploma: Validators.NonEmptyString,
			description: Validators.Tweet
		}
	}

	static checkProfileValidation(auxiliary) {
		let validators = AuxiliaryHelper.ProfileValidators;
		for (let v in validators) {
			let state = validators[v].getState(auxiliary[v])
			if (state !== 'success') {
				return false;
			}
		}
		return true;
	}

	static computeProfileProgression(auxiliary) {
		let r = 0;
		if (auxiliary.avatar) r += 10;
		if (auxiliary.answers && auxiliary.answers.length) r += 30;
		let validators = AuxiliaryHelper.ProfileValidators;
		for (let v in validators) {
			let state = validators[v].getState(auxiliary[v])
			if (state === 'success') {
				r += 4;
			}
		}
		return r;
	}
}