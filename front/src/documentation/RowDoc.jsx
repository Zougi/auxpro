// react modules
import React from 'react';

import { Panel, ITable } from 'lib/Lib.jsx';

class RowDoc extends React.Component {

	constructor(props) {
		super(props);
		this.myCodeMirror;
	}
	
	componentDidMount () {
		var mode = {name: "text/jsx", base: {name: "javascript", typescript: true}};
		this.myCodeMirror = CodeMirror.fromTextArea(this.refs.codemirror, {mode: mode });
		var defaultValue = "<div>Test</div>";
		this.myCodeMirror.getDoc().setValue(defaultValue);
		this.myCodeMirror.on('change',function(cMirror){
					document.getElementById("exemple").innerHTML = cMirror.getValue();
		});
		document.getElementById("exemple").innerHTML = this.myCodeMirror.getDoc().getValue();
	}
	
	render() {
		return(
			<Panel>
				<h1>Resultat</h1>
				<div id="exemple"></div>
				<h1>Code</h1>
				<textarea  ref="codemirror" ></textarea>
				<h1>Row</h1>
				<p>Bootstrap row</p>
				<h3>Exemple</h3>
				<p>{'<Row></Row>'}</p>
			</Panel>
	);}
}

export default RowDoc;