import React from 'react';
import { Panel } from 'react-bootstrap'

class PanelBasic extends React.Component {

	constructor(props) {
		super(props);
	}

	_buildContent() {
		let result = [];
		if (typeof this.props.text === 'string') {
			return this.props.text;
		}
		let l = (this.props.text || []).length;
		for (let i = 0; i < l; i++) {
			if (i > 0) {
				//result.push(<br key={'br' + i}/>);
			}
			result.push(<div key={i}>{this.props.text[i]}</div>);
		}
		return result;
	}
	render() { 
		console.log('here')
		console.log(this.props)
		return (
			<Panel bsStyle={this.props.bsStyle} header={this.props.header}>
				{this._buildContent()}
			</Panel>
		);
	}
}
export default PanelBasic;