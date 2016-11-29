export default class ArraySet {

	// Static methods //
	// --------------------------------------------------------------------------------


	// Constructor //
	// --------------------------------------------------------------------------------

	constructor(array) {
		if (Array.isArray(array)) {
			this._array = array;
		} else {
			this._array = [];
		}
	}


	// Getters & setters //
	// --------------------------------------------------------------------------------

	get size() {
		return this._array.length; 
	}

	get array() {
		return this._array.map(function (elem) { return elem; }); 
	}


	// Object methods //
	// --------------------------------------------------------------------------------

	add(element) {
		if (!this.has(element)) {
			this._array.push(element);
		} 
	}

	delete(element) { 
		this._array.splice(this._array.indexOf(element), 1);
	}

	has(element) { 
		return this._array.indexOf(element) !== -1; 
	}
}