import React from 'react';
import { Panel, Col, Row, Button, Glyphicon, Tooltip, OverlayTrigger } from 'react-bootstrap';

import './BusyIndicator.css';

class BusyIndicator extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='ap-busy-indicator'>
				<div className='ap-busy-indicator-item'/>
				<div className='ap-busy-indicator-item delay1'/>
				<div className='ap-busy-indicator-item delay2'/>
			</div>
		);
	}
}

export default BusyIndicator;