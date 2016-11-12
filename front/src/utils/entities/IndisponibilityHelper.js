import Validators from 'utils/form/Validators'
import MomentHelper from 'utils/moment/MomentHelper'
import Day from 'utils/constants/Day'
import Period from 'utils/constants/Period'

export default class IndisponibilityHelper {

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