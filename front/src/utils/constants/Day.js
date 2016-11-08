let MONDAY    = { key: 'MONDAY', value: 'Lundi' }
let TUESDAY   = { key: 'TUESDAY', value: 'Mardi' }
let WEDNESDAY = { key: 'WEDNESDAY', value: 'Mercredi' }
let THURSDAY  = { key: 'THURSDAY', value: 'Jeudi' }
let FRIDAY    = { key: 'FRIDAY', value: 'Vendredi' }
let SATURDAY  = { key: 'SATURDAY', value: 'Samedi' }
let SUNDAY    = { key: 'SUNDAY', value: 'Dimanche' }

export default class Day {

	static get MONDAY() { return MONDAY; }
	static get TUESDAY() { return TUESDAY; }
	static get WEDNESDAY() { return WEDNESDAY; }
	static get THURSDAY() { return THURSDAY; }
	static get FRIDAY() { return FRIDAY; }
	static get SATURDAY() { return SATURDAY; }
	static get SUNDAY() { return SUNDAY; }

	static get DAYS() { return [
		MONDAY,
		TUESDAY,
		WEDNESDAY,
		THURSDAY,
		FRIDAY,
		SATURDAY,
		SUNDAY
	];}

	static getDay(id) {
		return Day[id.toUpperCase()];
	}
}