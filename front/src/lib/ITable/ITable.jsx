import React from 'react'
import Base from '../Base.jsx';

import { Table } from '../Lib.jsx';

class ITable extends Base {

	constructor(props) {
		super(props);
		this.buildProps();
		this.index = 0;
	}
	
	buildProps() {
		this.tableProps = this.cloneObj(this.props);
		delete this.tableProps.rows;
	}
	
	getCol(col) {
		if (col.th)
			return (<th key={this.index++}>{col.th}</th>);
		else if (col.td)
			return (<td key={this.index++}>{col.td}</td>);
	}
	
	getContent() {
		var rows = this.props.rows || [];
		let tableContent = rows.map(function(row) {
			let currentRow = row.map(function(col) {
				return(this.getCol(col));
			}.bind(this));
			return (<tr key={this.index++}>{currentRow}</tr>);
		}.bind(this));
		return (tableContent);
	}
	
	render() {
		return(
			<Table {...this.tableProps}>
				{this.getContent()}
			</Table>
	);}
}
export default ITable;
