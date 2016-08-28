import React from 'react'
import Base from '../Base.jsx';

class Col extends Base {

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
		
		if (props.mdOffset)
			this.classNames += "col-md-offset-" + props.mdOffset + " ";
		if (props.smOffset)
			this.classNames += "col-sm-offset-" + props.smOffset + " ";
		if (props.xsOffset)
			this.classNames += "col-xs-offset-" + props.xsOffset + " ";
		if (props.lgOffset)
			this.classNames += "col-lg-offset-" + props.lgOffset + " ";
	}
	
	render() { 
		return(
			<div className={this.classNames}>
				{this.props.children}
			</div>
	);}
}

export default Col;