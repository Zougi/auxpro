import React from 'react'
import Base from '../Base.jsx';

class Table extends Base {

	constructor(props) {
		super(props);
		this.buildProps();
	}
	
	buildProps() {
		this.tableProps = {};
		this.copyFromObj(this.props, 'fill', this.tableProps);
		this.addClass(this.tableProps, "table");
		if (this.props.bordered)
			this.addClass(this.tableProps, "table-bordered");
		if (this.props.striped)
			this.addClass(this.tableProps, "table-striped");
		if (this.props.hover)
			this.addClass(this.tableProps, "table-hover");
		if (this.props.condensed)
			this.addClass(this.tableProps, "table-condensed");
		if (this.props.responsive)
			this.addClass(this.tableProps, "table-responsive");
	}
	
	getHead(){
		if (this.props.head)
			return (<thead>{this.props.children[0]}</thead>);
	}
	
	getBody() {
		var content = this.props.children;
		if (this.props.head)
			content.splice(0, 1);
		return (
			<tbody>
				{content}
			</tbody>
		);
	}
	
	render() {
		return(
			<table {...this.tableProps}>
				{this.getHead()}
				{this.getBody()}
			</table>
	);}
}

export default Table;