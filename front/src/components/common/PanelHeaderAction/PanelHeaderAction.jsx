import React from 'react';

import { Panel, Col, Row, Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

import './PanelHeaderAction.css';

class PanelHeaderAction extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		let actions = (this.props.actions || []).map(function(action) {
			let button = (
				<Button 
					key={this.props.actions.indexOf(action)}
					className='ap-button'
					bsSize={this.props.bsSize || 'xsmall'} 
					bsStyle={action.bsStyle} 
					onClick={action.callback}>
                    <Glyphicon glyph={action.glyph}/>
                </Button>
			);
			if (action.tooltip) {
				let tooltip = (
	 				<Tooltip id="tooltip">{action.tooltip}</Tooltip>
				);
				return (
					<OverlayTrigger key={this.props.actions.indexOf(action)} placement='top' overlay={tooltip}>
						{button}
	                </OverlayTrigger>
				);
			} else {
				return button;
			}			
		}.bind(this));

		let header = (
			<Row>
				<Col xs={6}>
                    {this.props.title}
                </Col>
                <Col className='ap-column' xs={6}>
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