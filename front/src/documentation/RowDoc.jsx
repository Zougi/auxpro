// react modules
import React from 'react';

import { Panel, ITable } from 'lib/Lib.jsx';

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