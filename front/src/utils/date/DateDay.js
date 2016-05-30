// custom modules
import { s, m, h, D, MONTHS } from './DateConstants.js';

export default class DateDay {

	constructor(date) {
		this.date = new Date(date);
		this.date.setHours(0, 0, 0);
		this.id = this.date.toString();
		this.value = this.date.getDate() + ' ' + MONTHS[this.date.getMonth()] + ' ' + this.date.getFullYear();
	}

	get previousDay() {
		return this.getDayInDays(-1);
	}

	get nextDay() {
		return this.getDayInDays(1);
	}

	getDayInDays(i) {
		if (i === 0) {
			return this;
		}
		var date = new Date(this.date);
		date.setDate(date.getDate() + i)
		return new DateDay(date);
	}

}
