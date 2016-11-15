import Validators from 'utils/form/Validators'
import MomentHelper from 'utils/moment/MomentHelper'
import Day from 'utils/constants/Day'
import Period from 'utils/constants/Period'

export default class IndisponibilityHelper {

	static get Validators() {
		return {
			startDate: Validators.NonNull,
			endDate: Validators.NonNull,
			startTime: Validators.NonNull,
			endTime: Validators.NonNull,
			period: Validators.NonNull,
			days: Validators.NonNull
		}
	}

	static checkValidation(indisponibility) {
		if (IndisponibilityHelper.Validators.startDate.getState(indisponibility.startDate) !== 'success') {
			return false;
		}
		if (IndisponibilityHelper.Validators.startTime.getState(indisponibility.startTime) !== 'success') {
			return false;
		}
		if (IndisponibilityHelper.Validators.endTime.getState(indisponibility.endTime) !== 'success') {
			return false;
		}
		if (IndisponibilityHelper.Validators.period.getState(indisponibility.period) !== 'success') {
			return false;
		}
		let period = Period.getPeriod(indisponibility.period);
		switch (period) {
			case Period.ONE:
				break;
			case Period.P1W:
			case Period.P2W:
			case Period.P3W:
			case Period.P4W:
				if (IndisponibilityHelper.Validators.endDate.getState(indisponibility.endDate) !== 'success') {
					return false;
				}
				if (IndisponibilityHelper.Validators.days.getState(indisponibility.days) !== 'success') {
					return false;
				}
				break;
		}
		return true;
	}

	static getInitialText(indisponibility) {
		let text = [];
		let period = Period.getPeriod(indisponibility.period);
		let startDate = MomentHelper.localDateToHumanDate(indisponibility.startDate);
		let startTime = MomentHelper.localTimeToHumanTime(indisponibility.startTime);
		let endTime   = MomentHelper.localTimeToHumanTime(indisponibility.endTime);
		switch (period) {
		case Period.ONE:
			text.push('Indisponibilité ponctuelle');
			text.push('Le ' + startDate);
			text.push('De ' + startTime + ' à ' + endTime);
			break;
		case Period.P1W:
		case Period.P2W:
		case Period.P3W:
		case Period.P4W:
			let endDate    = MomentHelper.localDateToHumanDate(indisponibility.endDate);
			let days = Day.daysToHumanFormat(indisponibility.days);
			text.push('Indisponibilité ' + period.value.toLowerCase());
			text.push('Du ' + startDate + ' au ' + endDate);
			text.push('Le ' + days);
			text.push('De ' + startTime + ' à ' + endTime);
			break;
		}
		return text;
	}
}