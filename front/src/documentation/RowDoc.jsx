// react modules
import React from 'react';

import Panel from 'components-lib/Panel/Panel.jsx';
import ITable from 'components-lib/ITable/ITable.jsx';

class RowDoc extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		return(
			<Panel>
				<h1>Row</h1>
				<p>Bootstrap row</p>
				<h3>Exemple</h3>
				<p>{'<Row></Row>'}</p>
			</Panel>
	);}
}

export default RowDoc;