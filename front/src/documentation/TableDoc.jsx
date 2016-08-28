// react modules
import React from 'react';

import { Panel, ITable } from 'lib/Lib.jsx';

class TableDoc extends React.Component {

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
				{td: "head"},
				{td: "boolean"},
				{td: "false"},
				{td: "set the first element in thead"}
			],
			[
				{td: "bordered"},
				{td: "boolean"},
				{td: "false"},
				{td: " "}
			],
			[
				{td: "condensed"},
				{td: "boolean"},
				{td: "false"},
				{td: " "}
			],
			[
				{td: "hover"},
				{td: "boolean"},
				{td: "false"},
				{td: " "}
			],
			[
				{td: "responsive"},
				{td: "boolean"},
				{td: "false"},
				{td: " "}
			],
			[
				{td: "striped"},
				{td: "boolean"},
				{td: "false"},
				{td: " "}
			]
		];
		
		return(
			<Panel>
				<h1>Table</h1>
				<p>Bootstrap table</p>
				<h3>Exemple</h3>
				<p>{'<Table bordered striped hover fill responsive head></Table>'}</p>
				<h3>Props</h3>
				<Panel>
					<ITable rows={table} bordered striped hover fill head/>
				</Panel>
			</Panel>
	);}
}

export default TableDoc;