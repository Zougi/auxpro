// custom modules
import { s, m, h, D } from './DateConstants.js';
import DateDay from './DateDay.js';
import DateWeek from './DateWeek.js';

export default class DateMonth {

	constructor(args) {
		this._start = args.start || 0;
		var day = args.date;
		if (!(day instanceof DateDay)) {
			day = new DateDay(args.date);
		}
		this.year = day.date.getFullYear();
		this.month = day.date.getMonth();
		let baseWeek = new DateWeek({ date: day, month: this.month, start: this._start });
		this.weeks = [ baseWeek ];
		// Load previous weeks
		let previousW = baseWeek.previousWeek;
		while (previousW.maxDate.date.getMonth() === this.month) {
			this.weeks.unshift(previousW);
			previousW = previousW.previousWeek;
		}
		// Load next weeks
		let nextW = baseWeek.nextWeek;
		while (this.weeks.length < 6) {
			this.weeks.push(nextW);
			nextW = nextW.nextWeek;
		}
	}

	get previousMonth() {
		return new DateMonth({ date: this.weeks[0].minDate.previousDay, start: this._start });
	}

	get nextMonth() {
		return new DateMonth({ date: this.weeks[this.weeks.length - 1].maxDate.nextDay, start: this._start });
	}
}
