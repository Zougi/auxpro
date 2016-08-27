// react modules
import React from 'react';

class Row extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() { 
		return(
			<div className="row">
				{this.props.children}
			</div>
	);}
}

export default Row;