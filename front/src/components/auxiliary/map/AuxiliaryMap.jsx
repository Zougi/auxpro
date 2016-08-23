import React from 'react'

import { Row, Col, Panel, Button } from 'react-bootstrap'

import GoogleMap from '../../../components-lib/Map/GoogleMap.jsx'

class AuxiliaryMap extends React.Component {

  	constructor(props) {
  		super(props);
  	}

  	_buildMarkers() {
  		return this.props.geoZones;
  	}

  	_buildCircles() {
  		return [];
  	}

  	render() {
  		let center = {
        	lattitude: Number(this.props.auxiliary.contact.address.lattitude),
        	longitude: Number(this.props.auxiliary.contact.address.longitude)
        };
		return (
			<Col>
				<GoogleMap 
					center={center} 
					markers={this._buildMarkers()} 
					circles={this._buildCircles()} />
			</Col>
  		);
  	}
}
/*
				<Col sm={2}>
					<Button bsStyle='success' onClick={this.activeCircle.bind(this)} block>active/desactive</Button>
					<input ref='autocomplete' className='autocomplete' placeholder='Enter address'  type='text' disabled={this.state.editMode !== 'circle'}></input>
					<input ref='radius' type='number' placeholder='Enter Radius' disabled={this.state.editMode !== 'circle'} onChange={this.radiusChange.bind(this)}></input>
					<Button bsStyle='success' onClick={this.validCircle.bind(this)} block>Valid</Button>
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

*/
export default AuxiliaryMap;
