// react modules
import React from 'react';

import Panel from 'components-lib/Panel/Panel.jsx';
import ITable from 'components-lib/ITable/ITable.jsx';

class ColDoc extends React.Component {

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
				{td: "lg"},
				{td: "number"},
				{td: " "},
				{td: "The number of columns you wish to span for Large devices Desktops (=1200px) class-prefix col-lg-"}
			],
			[
				{td: "md"},
				{td: "number"},
				{td: " "},
				{td: "The number of columns you wish to span for Medium devices Desktops (=992px) class-prefix col-md-"}
			],
			[
				{td: "sm"},
				{td: "number"},
				{td: " "},
				{td: "The number of columns you wish to span for Small devices Tablets (=768px) class-prefix col-sm-"}
			],
			[
				{td: "smOffset"},
				{td: "number"},
				{td: " "},
				{td: "Move columns to the right for Small devices Tablets class-prefix col-sm-offset-"}
			]
		];
		
		return(
			<Panel>
				<h1>Table</h1>
				<p>Bootstrap Col</p>
				<h3>Exemple</h3>
				<p>{'<Col sm={6}></Col>'}</p>
				<h3>Props</h3>
				<Panel>
					<ITable rows={table} bordered striped hover fill head/>
				</Panel>
			</Panel>
	);}
}

export default ColDoc;