import React from 'react'

import { Row, Col, Panel, Button } from 'react-bootstrap'

import Utils from '../../../utils/Utils.js'

import GoogleMap from '../../../components-lib/Map/GoogleMap.jsx'

class AuxiliaryMap extends React.Component {

  	constructor(props) {
  		super(props);
  	}

  	_buildCenter() {
  		return {
        	lattitude: Number(this.props.auxiliary.contact.address.lattitude),
        	longitude: Number(this.props.auxiliary.contact.address.longitude)
        };
  	}

  	_buildMarkers() {
  		let result = [];
  		// Add map center
  		result.push({
  			lattitude: Number(this.props.auxiliary.contact.address.lattitude),
  			longitude: Number(this.props.auxiliary.contact.address.longitude),
  			title: 'Mon domicile',
  			color: 'D9534F'
  		})
  		// Add geo zones 
  		result.push(...this.__buildMarkers(this.props.geoZones, 'Ma zone d\'intervention'));
  		// Add customers
  		result.push(...this.__buildMarkers(
  			Utils.map(this.props.customers, function (c) {
  				return c.contact.address;
  			}),
  			'Client', 
  			'5BC0DE'
  		));
  		// Add interventions
  		//result.push(...this.__buildMarkers(this.props.interventions, 'Intervention', '5CB85C'));
  		return result;
  	}
  	__buildMarkers(markers, title, color) {
  		return (markers || []).map(function (marker) {
  			return {
  				lattitude: Number(marker.lattitude),
  				longitude: Number(marker.longitude),
  				title: title,
  				color: color
  			};
  		});
  	}

  	_buildCircles() {
  		let result = [];
  		// Add geo zones
  		let l = (this.props.geoZones || []).length;
  		for (let i = 0; i < l; i++) {
  			let gz = this.props.geoZones[i];
  			result.push({
  				lattitude: Number(gz.lattitude),
  				longitude: Number(gz.longitude),
  				radius: parseFloat(gz.radius)
  			});
  		}
  		return result;
  	}

  	render() {
		return (
			<Col>
				<GoogleMap 
					center={this._buildCenter()} 
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
