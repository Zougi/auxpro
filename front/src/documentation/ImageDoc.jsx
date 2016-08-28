// react modules
import React from 'react';

import Panel from 'components-lib/Panel/Panel.jsx';
import ITable from 'components-lib/ITable/ITable.jsx';

class ImageDoc extends React.Component {

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
				{td: "src"},
				{td: "string"},
				{td: "Not optional"},
				{td: "Image Path"}
			],
			[
				{td: "rounded"},
				{td: "boolean"},
				{td: "false"},
				{td: "Sets image shape as rounded"}
			]
		];
		
		return(
			<Panel>
				<h1>Image</h1>
				<h3>Exemple</h3>
				<p>{'<Image src="image.jpeg" rounded/>'}</p>
				<h3>Props</h3>
				<Panel>
					<ITable rows={table}/>
				</Panel>
			</Panel>
	);}
}

export default ImageDoc;