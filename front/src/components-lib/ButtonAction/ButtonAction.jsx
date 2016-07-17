import React from 'react';
import { Panel, Col, Row, Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

import './ButtonAction.css';

class ButtonAction extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.tooltip) {
			let tooltip = (
 				<Tooltip 
 					className='ap-button-action-tooltip'
 					id="tooltip">
 					{this.props.tooltip}
 				</Tooltip>
			);
			return (
				<OverlayTrigger 
					placement={this.props.placement || 'top'} 
					overlay={tooltip}>
					<Button 
						className='ap-button-action'
						bsSize={this.props.bsSize} 
						bsStyle={this.props.bsStyle} 
						onClick={this.props.onClick}>
		                <Glyphicon glyph={this.props.glyph}/>
            		</Button>
                </OverlayTrigger>
			);
		} else {
			return (
				<Button 
					className='ap-button-action'
					bsSize={this.props.bsSize} 
					bsStyle={this.props.bsStyle} 
					onClick={this.props.onClick}>
	                <Glyphicon glyph={this.props.glyph}/>
            	</Button>
           	);
		}
	}
}

export default ButtonAction;