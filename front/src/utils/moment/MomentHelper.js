// lib modules
import moment from 'moment';

moment.locale('fr')

/**
 *
 * @param {moment} [moment]
 * @returns
 */
export function buildMonthWeeks(moment) {

}

export function toLocalDate(moment) {
	return moment.toArray().slice(0, 3);
}
export function toLocalDateTime(moment) {
	return moment.toArray().slice(0, 5);
}

export function fromLocalDate(date) {
	return moment(getLocaleDateArray(date));
}
function getLocaleDateArray(date) {
	return [date[0], date[1] - 1, date[2]];
}
export function fromLocalTime(date, time) {
	return moment(getLocaleDateArray(date).concat(time));
}


export function toHumanDate(m) {
	return m.format('D') + ' ' + m.format('MMMM') + ' ' + m.format('YYYY');
}
export function toHumanTime(m) {
	return m.format('H') + 'h' + m.format('mm');
}

/**
 * Builds an array containing moments representing days of the current week
 * @param {moment} [moment]
 * @returns
 */
export function buildWeekDays(moment) {
	let week = moment.startOf('weeks').clone();
	let days = [];
	for (let i = 0; i < 7; i++) {
		let day = week.clone().add(i, 'days');
		days.push(day);
	}
	return days;
}

/**
 * Builds an array containing intervals of a day based on the given duration
 * @param {moment} [moment]
 * @param {moment} [start]
 * @param {moment} [end]
 * @param {moment} [moment]
 * @returns
 */
export function buildDayInterval(moment, start, end, duration) {
	moment = moment || moment();
	start = start || moment.startOf('days');
	end = end || moment.endOf('days');
	let intervals = [];
	let current = start.clone();
	intervals.push(moment.startOf('days'));
	while (current.isBefore(end)) {
		let hour = current.clone();
		intervals.push(hour);
		current.add(duration);
	}
	intervals.push(end);
	return intervals;
}