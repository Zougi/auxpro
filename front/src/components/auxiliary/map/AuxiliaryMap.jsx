import React from 'react'

import { Col, Panel, Button } from 'react-bootstrap'

import GoogleMap from '../../../components-lib/Map/GoogleMap.jsx'

class AuxiliaryMap extends React.Component {

  	constructor(props) {
  		super(props);
  	}
  
  	render() {
		return (
			<Row>
				<Col sm={2}>
					<Button bsStyle='success' onClick={this.activeCircle.bind(this)} block>active/desactive</Button>
					<input ref='autocomplete' className='autocomplete' placeholder='Enter address'  type='text' disabled={this.state.editMode !== 'circle'}></input>
					<input ref='radius' type='number' placeholder='Enter Radius' disabled={this.state.editMode !== 'circle'} onChange={this.radiusChange.bind(this)}></input>
					<Button bsStyle='success' onClick={this.validCircle.bind(this)} block>Valid</Button>
				</Col>
				<Col sm={8}>
					<GoogleMap geoZones={this.props.geoZones}/>
				</Col>
				<Col sm={2}>
					{this.state.areas.map((area, index) => {
	              		return (
							<Panel onClick={this.deleteArea.bind(this, index)}>
								Type: {area.type} Adresse: {area.adress} Radius: {area.circle.radius}
							</Panel> 
	              		);
	            	})}
				</Col>
			</Row>
  		);
  	}
}

export default AuxiliaryMap;
