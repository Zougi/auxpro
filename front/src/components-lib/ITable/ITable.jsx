// react modules
import React from 'react';

import Table from 'components-lib/Table/Table.jsx';

class ITable extends React.Component {

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
		var rows = this.props.rows || [];
		
		let tableContent = rows.map(function(row) {
			let currentRow = row.map(function(col) {
				return(this.getCol(col));
			}.bind(this));
			return (<tr>{currentRow}</tr>);
		}.bind(this));
		
		return(
				<Table bordered striped hover fill>
					{tableContent}
				</Table>
	);}
}
export default ITable;
