// react modules
import React from 'react';

class Table extends React.Component {

	constructor(props) {
		super(props);
		this.tableProps = {};
		this.fillTableProps(props)
	}
	
	fillTableProps(props) {
		if (props.fill)
			this.tableProps.fill = "true";
		
		var classNames = "table ";
		if (props.bordered)
			classNames += "table-bordered ";
		if (props.striped)
			classNames += "table-striped ";
		if (props.hover)
			classNames += "table-hover ";
		if (props.condensed)
			classNames += "table-condensed ";
		if (props.responsive)
			classNames += "table-responsive ";
		this.tableProps.className = classNames;
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