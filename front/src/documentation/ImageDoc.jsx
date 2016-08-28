// react modules
import React from 'react';

import { Panel, ITable } from 'lib/Lib.jsx';

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
				<p>Bootstrap image</p>
				<h3>Exemple</h3>
				<p>{'<Image src="image.jpeg" rounded/>'}</p>
				<h3>Props</h3>
				<Panel>
					<ITable rows={table} bordered striped hover fill head/>
				</Panel>
			</Panel>
	);}
}

export default ImageDoc;