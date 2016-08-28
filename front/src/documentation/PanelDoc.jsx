// react modules
import React from 'react';

import Panel from 'components-lib/Panel/Panel.jsx';
import ITable from 'components-lib/ITable/ITable.jsx';

class PanelDoc extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		var table = [
			[
				{th: "Name"},
				{th: "Type"},
				{th: "Default"},
				{th: "Description"}
			],
			[
				{td: "body"},
				{td: "boolean"},
				{td: "false"},
				{td: "Use panel-body"}
			]
		];
		
		return(
			<Panel>
				<h1>Table</h1>
				<p>Bootstrap Panel</p>
				<h3>Exemple</h3>
				<p>{'<Panel body></Panel>'}</p>
				<h3>Props</h3>
				<Panel>
					<ITable rows={table} bordered striped hover fill head/>
				</Panel>
			</Panel>
	);}
}

export default PanelDoc;