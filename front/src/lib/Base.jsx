import React from 'react';

class Base extends React.Component {

	constructor(props) {
		super(props);
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