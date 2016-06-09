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