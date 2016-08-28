import React from 'react';

class Base extends React.Component {

	constructor(props) {
		super(props);
	}
	
	copyFromObj(obj1, key, obj2) {
		if (obj1[key]) {
			obj2[key] = obj1[key];
		}
	}
	
	copyRenameFromObj(obj1, key1, obj2, key2) {
		if (obj1[key1]) {
			obj2[key2] = obj1[key1];
		}
	}
	
	cloneObj(obj) {
		if (null == obj || "object" != typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		}
		return copy;
	}
	
	render() {
		return(
			<p>Base Component</p>
		);
	}
}

export default Base;