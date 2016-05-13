// custom modules
import { s, m, h, D, MONTHS_NB, DAYS_NB } from './DateConstants.js';

export default class DateDay {

	constructor(date) {
		this.date = new Date(date);
		this.date.setHours(0, 0, 0);
		this.id = this.date.getFullYear() + '-' + MONTHS_NB[this.date.getMonth()] + '-' + DAYS_NB[this.date.getDate()];
	}

	get previousDay() {
		return new DateDay(this.date.getTime() - D);
	}

	get nextDay() {
		return new DateDay(this.date.getTime() + D);		
	}

	getDayInDays(i) {
		if (i === 0) {
			return this;
		}
		return new DateDay(this.date.getTime() + i * D);		
	}
}
