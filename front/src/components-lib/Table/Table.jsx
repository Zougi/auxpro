// react modules
import React from 'react';

class Table extends React.Component {

	constructor(props) {
		super(props);
		this.tableProps = {};
		this.fillTableProps(props)
	}
	
	fillTableProps(props) {
		if (this.props.fill)
			this.tableProps.fill = "true";
		
		var classNames = "table ";
		if (props.bordered)
			classNames += "table-bordered ";
		if (props.striped)
			classNames += "table-striped ";
		if (props.hover)
			classNames += "table-hover ";
		this.tableProps.className = classNames;
	}
	
	render() { 
		return(
			<table {...this.tableProps}>
				{this.props.children}
			</table>
	);}
}

export default Table;