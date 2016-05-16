// custom modules
import { s, m, h, D } from './DateConstants.js';
import DateDay from './DateDay.js';

export default class DateWeek {

	/**
	 * Constructs a new DateWeek representation
	 * @param args
	 * @param {Date} [args.date]
	 * @param {int}  [args.start]
	 */
	constructor(args) {
		this.days = [];	
		this._start = args.start || 0;
		
		var day = args.date;
		if (!(day instanceof DateDay)) {
			day = new DateDay(args.date);
		}
		var d = day.date.getDay();
		d = d<this._start?d+7:d;

		for (var i = this._start; i < this._start + 7; i++) {
			if (i % 7 === d % 7) {
				this.days.push(day);
			} else {
				this.days.push(day.getDayInDays(i - d));
			}
		}
	}

	get id() {
		return this.days[0].id;
	}

	get minDate() {
		return this.days[0];
	}

	get maxDate() {
		return this.days[6];
	}

	get previousWeek() {
		return new DateWeek({ 
			date : this.minDate.previousDay, 
			start: this._start 
		});
	}

	get nextWeek() {
		return new DateWeek({ 
			date : this.maxDate.nextDay, 
			start: this._start 
		});
	}
}