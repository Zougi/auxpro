
export default class PlaningHelper {

	constructor(planing) {
		this.planing = planing || {};
	}

	getForYear(year) {
		return this.planing[year];
	}
	getForMonth(year, month) {
		let res = this.getForYear(year);
		if (res) {
			return res[month];
		}
	}
	getForDay(year, month, day) {
		let res = this.getForMonth(year, month);
		if (res) {
			return res[day];
		}
	}

	hasYear(year) {
		return this.getForYear(year) !== undefined;
	}
	hasMonth(year, month) {
		return (this.hasYear(year)) && (this.getForMonth(year, month) !== undefined);
	}
	hasDay(year, month, day) {
		return (this.hasMonth(year, month)) && (this.getForDay(year, month, day) !== undefined);
	}

	setDay(year, month, day, value) {
		if (!this.hasYear(year)) { this.planing[year] = {}; }
		if (!this.hasMonth(year, month)) { this.planing[year][month] = {}; }
		this.planing[year][month][day] = value;
	}

	pushDay(year, month, day, value) {
		if (!this.hasDay(year, month, day)) {
			this.setDay(year, month, day, []);
		}
		this.getForDay(year, month, day).push(value);
	}
}