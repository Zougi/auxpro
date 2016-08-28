// react modules
import React from 'react';

import { Panel, ITable } from 'lib/Lib.jsx';

class FormInputDoc extends React.Component {

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
				{td: "name"},
				{td: "string"},
				{td: " "},
				{td: "input name"}
			],
			[
				{td: "id"},
				{td: "string"},
				{td: " "},
				{td: "input id"}
			],
			[
				{td: "type"},
				{td: "string"},
				{td: "text"},
				{td: "input type : text, email, password"}
			],
			[
				{td: "placeholder"},
				{td: "string"},
				{td: " "},
				{td: "input placeholder"}
			],
			[
				{td: "defaultValue"},
				{td: "string"},
				{td: " "},
				{td: "input defaultValue"}
			],
			[
				{td: "label"},
				{td: "string"},
				{td: " "},
				{td: "input label"}
			],
			[
				{td: "onChange"},
				{td: "function"},
				{td: " "},
				{td: "onChange(event, value, name) when input change"}
			]
		];
		
		return(
			<Panel>
				<h1>FormInput</h1>
				<p>Bootstrap Form input</p>
				<h3>Exemple</h3>
				<p>{'<FormInput id="myId" defaultValue="default" onChange={onChange} />'}</p>
				<h3>Props</h3>
				<Panel>
					<ITable rows={table} bordered striped hover fill head/>
				</Panel>
			</Panel>
	);}
}

export default FormInputDoc;