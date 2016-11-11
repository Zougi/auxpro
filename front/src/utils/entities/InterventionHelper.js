import Validators from 'utils/form/Validators'
import MomentHelper from 'utils/moment/MomentHelper'
import Day from 'utils/constants/Day'
import Period from 'utils/constants/Period'

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

	static getInitialText(intervention) {
		let text = [];
		if (intervention.oneTime) {
			let date      = MomentHelper.localDateToHumanDate(intervention.oneTime.date);
			let startTime = MomentHelper.localTimeToHumanTime(intervention.oneTime.startTime);
			let endTime   = MomentHelper.localTimeToHumanTime(intervention.oneTime.endTime);
			text.push('Prestation unique');
			text.push('Le ' + date);
			text.push('De ' + startTime + ' à ' + endTime);
		} else if (intervention.recurence) {
			let startDate = MomentHelper.localDateToHumanDate(intervention.recurence.startDate);
			let endDate   = MomentHelper.localDateToHumanDate(intervention.recurence.endDate);
			let startTime = MomentHelper.localTimeToHumanTime(intervention.recurence.startTime);
			let endTime   = MomentHelper.localTimeToHumanTime(intervention.recurence.endTime);
			let period    = Period.getPeriod(intervention.recurence.period).value.toLowerCase();
			let sortedDays = intervention.recurence.days.
			map(function (d) { 
				return Day.getDay(d); 
			}).
			sort(function (d1, d2) {
				return Day.DAYS.indexOf(d1) - Day.DAYS.indexOf(d2);
			});
			let days = '';
			for (let i = 0 ; i < sortedDays.length ; i++) {
				if (i > 0) {
					days += ', ';
				}
				days += sortedDays[i].value.toLowerCase();
			}
			text.push('Prestation ' + period);
			text.push('Du ' + startDate + ' au ' + endDate);
			text.push('Les ' + days);
			text.push('De ' + startTime + ' à ' + endTime);
		}
		return text;
	}
}