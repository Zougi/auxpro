import Validators from 'utils/form/Validators'

export default class InterventionHelper {

	static get ValidatorsOneTime() {
		return {
			startTime: Validators.NonNull,
			endTime: Validators.NonNull,
			date: Validators.NonNull
		}
	}
	static get ValidatorsRecurence() {
		return {
			startDate: Validators.NonNull,
			endDate: Validators.NonNull,
			startTime: Validators.NonNull,
			endTime: Validators.NonNull,
			period: Validators.NonNull,
			days: Validators.NonNull
		}
	}

	static checkValidation(intervention) {
		if (intervention.oneTime) {
			return InterventionHelper.checkValidationOneTime(intervention);
		}
		if (intervention.recurence) {
			return InterventionHelper.checkValidationRecurence(intervention);
		}
		return false;
	}

	static checkValidationOneTime(intervention) {
		if (Validators.NonEmptyString.getState(intervention.customerId) !== 'success') {
			return false;
		}
		if (intervention.oneTime) {
			let validators = InterventionHelper.ValidatorsOneTime;
			for (let v in validators) {
				let state = validators[v].getState(intervention.oneTime[v])
				if (state !== 'success') {
					return false;
				}
			}
			return true;
		}
		return false;
	}

	static checkValidationRecurence(intervention) {
		if (Validators.NonEmptyString.getState(intervention.customerId) !== 'success') {
			return false;
		}
		if (intervention.recurence) {
			let validators = InterventionHelper.ValidatorsRecurence;
			for (let v in validators) {
				let state = validators[v].getState(intervention.recurence[v])
				if (state !== 'success') {
					return false;
				}
			}
			return true;
		}
		return false;
	}
}