// custom modules
import { s, m, h, D } from './DateConstants.js';

export default class DateDay {

	constructor(date) {
		this.date = new Date(date);
		this.date.setHours(0, 0, 0);
		this.id = this.date.toString();
	}

	get previousDay() {
		return new DateDay(this.date.getTime() - 1.5*D);
	}

	get nextDay() {
		return new DateDay(this.date.getTime() + 1.5*D);		
	}

	getDayInDays(i) {
		if (i === 0) {
			return this;
		}
		return new DateDay(this.date.getTime() + i * D);		
	}
}
