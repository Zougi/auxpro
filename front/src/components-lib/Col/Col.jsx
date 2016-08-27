// react modules
import React from 'react';

class Col extends React.Component {

	constructor(props) {
		super(props);
		this.classNames = "";
		this.fillClassNames(props);
	}
	
	fillClassNames(props) {
		if (props.md)
			this.classNames += "col-md-" + props.md + " ";
		if (props.sm)
			this.classNames += "col-sm-" + props.sm + " ";
		if (props.xs)
			this.classNames += "col-xs-" + props.sm + " ";
		if (props.lg)
			this.classNames += "col-lg-" + props.sm + " ";
		
		if (props.smOffset)
			this.classNames += "col-sm-offset-" + props.smOffset + " ";
	}
	
	render() { 
		return(
			<div className={this.classNames}>
				{this.props.children}
			</div>
	);}
}

export default Col;