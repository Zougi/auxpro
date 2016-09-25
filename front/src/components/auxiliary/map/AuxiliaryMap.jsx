import React from 'react'

import { Row, Col, Panel, Button } from 'react-bootstrap'

import Utils from 'utils/Utils.js'

import AuxiliaryHeader from '../AuxiliaryHeader.jsx'
import AuxiliaryGeoPanel from './AuxiliaryGeoPanel.jsx'
import GoogleMap from 'components-lib/Map/GoogleMap.jsx'

var MODES = {
    SELECT: 'SELECT',
    NONE: 'NONE'
}

class AuxiliaryMap extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = { mode: MODES.NONE };
    }

    onMarkerClicked(marker) {
        switch(marker.type) {
        case 'A':
            console.log('auxiliaire cliqué: ' + marker.id)
            break;
        case 'C':
            console.log('client cliqué: ' + marker.id)
            break;
        default:
            console.log('société')
            break;
        }
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
        result.push(...Utils.map(this.props.customers, function (c) {
            return {
                id: c.id,
                type: 'C',
                lattitude: c.contact.address.lattitude,
                longitude: c.contact.address.longitude,
                title: c.person.civility + ' ' + c.person.lastName + ' ' + c.person.firstName,
                color: c.type === 'intervention' ? '5CB85C' : '5BC0DE'
            };
        }));
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

    _mapClicked(event) {
        if (this.state.mode === MODES.SELECT) {
            console.log(event);
        } else {
            console.log(this.state.mode);
        }
    }

    switchMode() {
        if (this.state.mode === MODES.NONE) {
            this.setState({ mode: MODES.SELECT });
        } else {
            this.setState({ mode: MODES.NONE });
        }
        console.log(this.state.mode)
    }

  	render() {
		    return (
            <div>
                <AuxiliaryHeader auxiliary={this.props.auxiliary}/>
                <br/>
                <Col sm={4}>
                    <AuxiliaryGeoPanel onToggleSelect={this.switchMode.bind(this)}/>
                </Col>
          			<Col sm={8}>
            				<GoogleMap 
                        center={this._buildCenter()} 
                        onMapClicked={this._mapClicked.bind(this)}
              					markers={this._buildMarkers()} 
              					circles={this._buildCircles()} />
          			</Col>
            </div>
  		  );
  	}
}

export default AuxiliaryMap;
