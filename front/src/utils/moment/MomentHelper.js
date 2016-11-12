// lib modules
import moment from 'moment';

moment.locale('fr')

export default class MomentHelper {

	static localDateEquals (localDate1, localDate2) {
		let result =
			localDate1[0] === localDate2[0] && 
			localDate1[1] === localDate2[1] && 
			localDate1[2] === localDate2[2];
		return result;
	}

	/*	
		LOCAL DATE
		Representation of the Java LocalDate object comes as integer array:
		[ {year}, {month}, {day of month} ]
		/!\ java month numerotation : 1 > 12

		Representation of the Java LocalTime object comes as integer array:
		[ {minute}, {second} ]
	 */
	 
	static localDateToHumanDate (localDate) {
		if (localDate) {
			return MomentHelper.toHumanDate(MomentHelper.fromLocalDate(localDate));
		} else {
			return '';
		}
	}
	static localTimeToHumanTime (localTime) {
		if (localTime) {
			return MomentHelper.toHumanTime(MomentHelper.fromLocalTime(localTime));
		} else {
			return '';
		}		
	}

	/*	
		MOMENT
		/!\ moment month numerotation : 0 > 11
	 */

	static fromLocalDate (date) {
		return moment(MomentHelper.getLocaleDateArray(date));
	}

	static toLocalDate (moment) {
		let array = moment.toArray();
		return [ array[0], array[1] + 1, array[2] ];
	}

	static fromLocalTime (time) {
		return moment(MomentHelper.getLocaleDateArray(MomentHelper.toLocalDate(moment())).concat(time));
	}

	static toLocalDateTime (moment) {
		let array = moment.toArray();
		return [ array[0], array[1] + 1, array[2], array[3], array[4] ];
	}

	static getLocaleDateArray (date) {
		return [date[0], date[1] - 1, date[2]];
	}

	static toHumanDate (m) {
		return m.format('D') + ' ' + m.format('MMMM') + ' ' + m.format('YYYY');
	}
	static toHumanTime (m) {
		return m.format('H') + 'h' + m.format('mm');
	}

	/**
	 * Builds a matrix containing moments representing days of the current month for each week.
	 * Always returns 6 weeks even if the last one does not contain any day from the initial month.
	 * @param {moment} [moment]
	 * @returns
	 */
	static buildMonthWeeks (moment) {
	}

	/**
	 * Builds an array containing moments representing days of the current week
	 * @param {moment} [moment]
	 * @returns
	 */
	static buildWeekDays (moment) {
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
	static buildDayInterval (moment, start, end, duration) {
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
}
