// react modules
import React from 'react';

import { Panel, ITable } from 'lib/Lib.jsx';

class ITableDoc extends React.Component {

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
				{td: "rows"},
				{td: "special"},
				{td: " "},
				{td: "ITable Content"}
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
				<h1>ITable</h1>
				<p>Iterative Bootstrap table</p>
				<h3>Exemple</h3>
				<p>
					{"var rows = [ 				\
						[								\
							{th: 'Title1'},			\
							{th: 'Title2'}  		\
						],								\
						[								\
							{td: 'Text1'},			\
							{td: 'Text2'}			\
						],								\
						[								\
							{th: 'Title'},			\
							{td: 'Text'}			\
						]								\
					];"}					
				</p>
				<p>{'<ITable rows={rows} bordered striped hover fill responsive head/>'}</p>
				<h3>Props</h3>
				<Panel>
					<ITable rows={table} bordered striped hover fill head/>
				</Panel>
			</Panel>
	);}
}

export default ITableDoc;