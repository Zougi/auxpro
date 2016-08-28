import React from 'react'
import Base from '../Base.jsx';

class Col extends Base {

	constructor(props) {
		super(props);
		this.buildProps();
	}
	
	buildProps() {
		this.colProps = {};
		
		if (this.props.md)
			this.addClass(this.colProps, "col-md-" + this.props.md);
		if (this.props.sm)
			this.addClass(this.colProps, "col-sm-" + this.props.sm);
		if (this.props.xs)
			this.addClass(this.colProps, "col-xs-" + this.props.xs);
		if (this.props.lg)
			this.addClass(this.colProps, "col-lg-" + this.props.lg);
		
		if (this.props.mdOffset)
			this.addClass(this.colProps, "col-md-offset-" + this.props.mdOffset);
		if (this.props.smOffset)
			this.addClass(this.colProps, "col-sm-offset-" + this.props.smOffset);
		if (this.props.xsOffset)
			this.addClass(this.colProps, "col-xs-offset-" + this.props.xsOffset );
		if (this.props.lgOffset)
			this.addClass(this.colProps, "col-lg-offset-" + this.props.lgOffset);
	}
	
	render() { 
		return(
			<div {...this.colProps}>
				{this.props.children}
			</div>
	);}
}

export default Col;