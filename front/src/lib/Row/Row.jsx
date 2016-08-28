import React from 'react'
import Base from '../Base.jsx';

class Row extends Base {

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