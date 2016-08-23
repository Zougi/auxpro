import React from 'react'

import { Row, Col, Panel, Button } from 'react-bootstrap'

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
  			title: 'Mon domicile'
  		})
  		// Add geo zones
  		let l = (this.props.geoZones || []).length;
  		for (let i = 0; i < l; i++) {
  			let gz = this.props.geoZones[i];
  			result.push({
  				lattitude: Number(gz.lattitude),
  				longitude: Number(gz.longitude),
  				title: 'Ma zone d\'intervention'
  			});
  		}
  		// Add interventions
  		l = (this.props.interventions || []).length;
  		for (let i = 0; i < l; i++) {
  			let gz = this.props.geoZones[i];
  			result.push({
  				lattitude: Number(gz.lattitude),
  				longitude: Number(gz.longitude),
  				title: 'Intervention'
  			});
  		}
  		// Add offers
  		l = (this.props.offers || []).length;
  		for (let i = 0; i < l; i++) {
  			let gz = this.props.geoZones[i];
  			result.push({
  				lattitude: Number(gz.lattitude),
  				longitude: Number(gz.longitude),
  				title: 'Offre'
  			});
  		}
  		return result;
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
