import Validators from 'utils/form/Validators'
import MomentHelper from 'utils/moment/MomentHelper'
import Day from 'utils/constants/Day'
import Period from 'utils/constants/Period'

export default class InterventionHelper {

	static get Validators() {
		return {
			customerId: Validators.NonEmptyString,
			startDate: Validators.NonNull,
			endDate: Validators.NonNull,
			startTime: Validators.NonNull,
			endTime: Validators.NonNull,
			period: Validators.NonNull,
			days: Validators.NonNull
		}
	}

	static checkValidation(intervention) {
		if (InterventionHelper.Validators.customerId.getState(intervention.customerId) !== 'success') {
			return false;
		}
		if (InterventionHelper.Validators.startDate.getState(intervention.startDate) !== 'success') {
			return false;
		}
		if (InterventionHelper.Validators.startTime.getState(intervention.startTime) !== 'success') {
			return false;
		}
		if (InterventionHelper.Validators.endTime.getState(intervention.endTime) !== 'success') {
			return false;
		}
		if (InterventionHelper.Validators.period.getState(intervention.period) !== 'success') {
			return false;
		}
		let period = Period.getPeriod(intervention.period);
		switch (period) {
			case Period.ONE:
				break;
			case Period.P1W:
			case Period.P2W:
			case Period.P3W:
			case Period.P4W:
				if (InterventionHelper.Validators.endDate.getState(intervention.endDate) !== 'success') {
					return false;
				}
				if (InterventionHelper.Validators.days.getState(intervention.days) !== 'success') {
					return false;
				}
				break;
		}
		return true;
	}

	static getInitialText(intervention) {
		let text = [];
		let period = Period.getPeriod(intervention.period);
		let startDate = MomentHelper.localDateToHumanDate(intervention.startDate);
		let startTime = MomentHelper.localTimeToHumanTime(intervention.startTime);
		let endTime   = MomentHelper.localTimeToHumanTime(intervention.endTime);
		switch (period) {
			case Period.ONE:
				text.push('Prestation unique');
				text.push('Le ' + startDate);
				text.push('De ' + startTime + ' à ' + endTime);
				break;
			case Period.P1W:
			case Period.P2W:
			case Period.P3W:
			case Period.P4W:
				let endDate    = MomentHelper.localDateToHumanDate(intervention.endDate);
				let periodText = period.value.toLowerCase();
				let days = Day.daysToHumanFormat(intervention.days);
				text.push('Prestation ' + periodText);
				text.push('Du ' + startDate + ' au ' + endDate);
				text.push('Le ' + days);
				text.push('De ' + startTime + ' à ' + endTime);
		}
		return text;
	}
}