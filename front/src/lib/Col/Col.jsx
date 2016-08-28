import React from 'react'
import Base from '../Base.jsx';

class Col extends Base {

	constructor(props) {
		super(props);
		this.buildProps();
	}
	
	buildProps() {
		this.colProps = {};
		
		this.addClassIf(this.props.md, this.colProps, "col-md-" + this.props.md);
		this.addClassIf(this.props.sm, this.colProps, "col-sm-" + this.props.sm);
		this.addClassIf(this.props.xs, this.colProps, "col-xs-" + this.props.xs);
		this.addClassIf(this.props.lg, this.colProps, "col-lg-" + this.props.lg);
		
		this.addClassIf(this.props.mdOffset, this.colProps, "col-md-offset-" + this.props.mdOffset);
		this.addClassIf(this.props.smOffset, this.colProps, "col-sm-offset-" + this.props.smOffset);
		this.addClassIf(this.props.xsOffset, this.colProps, "col-xs-offset-" + this.props.xsOffset);
		this.addClassIf(this.props.lgOffset, this.colProps, "col-lg-offset-" + this.props.lgOffset);
	}
	
	render() { 
		return(
			<div {...this.colProps}>
				{this.props.children}
			</div>
	);}
}

export default Col;