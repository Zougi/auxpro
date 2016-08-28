// react modules
import React from 'react';

import Table from 'components-lib/Table/Table.jsx';

class ITable extends React.Component {

	constructor(props) {
		super(props);
	}

	clone(obj) {
		if (null == obj || "object" != typeof obj) return obj;
		var copy = obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
		}
		return copy;
	}
	
	getCol(col) {
		if (col.th)
			return (<th>{col.th}</th>);
		else if (col.td)
			return (<td>{col.td}</td>);
	}
	
	render() {
		var props = this.clone(this.props);
		var rows = props.rows || [];
		delete props.rows;
		
		let tableContent = rows.map(function(row) {
			let currentRow = row.map(function(col) {
				return(this.getCol(col));
			}.bind(this));
			return (<tr>{currentRow}</tr>);
		}.bind(this));
		
		return(
				<Table {...props}>
					{tableContent}
				</Table>
	);}
}
export default ITable;
