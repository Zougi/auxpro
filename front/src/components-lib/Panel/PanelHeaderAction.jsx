import React from 'react';
import { Panel, Col, Row, Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

import './PanelHeaderAction.css';

import ButtonAction from '../ButtonAction/ButtonAction.jsx';

class PanelHeaderAction extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let actions = (this.props.actions || []).map(function(action) {
			return (
				<ButtonAction 
					key={this.props.actions.indexOf(action)}
					bsSize={this.props.bsSize || 'xsmall'} 
					bsStyle={action.bsStyle} 
					glyph={action.glyph}
					tooltip={action.tooltip}
					onClick={action.callback} />
			);
		}.bind(this));

		let header = (
			<Row>
				<Col xs={8}>
                    {this.props.title}
                </Col>
                <Col className='ap-column' xs={4}>
                    {actions}
                </Col>
			</Row>
		);

		return (
			<Panel bsStyle={this.props.bsStyle} header={header} className='ap-panel-header-action'>
				{this.props.children}
			</Panel>
		);
	}
}

export default PanelHeaderAction;