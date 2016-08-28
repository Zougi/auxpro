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
		
		this.addClassIf(this.props.bordered, this.tableProps, "table-bordered")
		this.addClassIf(this.props.striped, this.tableProps, "table-striped")
		this.addClassIf(this.props.hover, this.tableProps, "table-hover")
		this.addClassIf(this.props.condensed, this.tableProps, "table-condensed")
		this.addClassIf(this.props.responsive, this.tableProps, "table-responsive")
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