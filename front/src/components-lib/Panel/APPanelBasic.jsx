import React from 'react';
// Custom components
import APPanelHeaderAction from 'components-lib/Panel/APPanelHeaderAction'

class APPanelBasic extends React.Component {

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
			result.push(<div key={i}>{this.props.text[i]}</div>);
		}
		return result;
	}
	render() { 
		return (
			<APPanelHeaderAction
				bsStyle={this.props.bsStyle}
				title={this.props.title}
				actions={this.props.actions}>
				{this._buildContent()}
			</APPanelHeaderAction>
		);
	}
}
export default APPanelBasic;