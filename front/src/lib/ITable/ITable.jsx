import React from 'react'
import Base from '../Base.jsx';

import { Table } from '../Lib.jsx';

class ITable extends Base {

	constructor(props) {
		super(props);
	}
	
	getCol(col) {
		if (col.th)
			return (<th>{col.th}</th>);
		else if (col.td)
			return (<td>{col.td}</td>);
	}
	
	render() {
		var props = this.cloneObj(this.props);
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
