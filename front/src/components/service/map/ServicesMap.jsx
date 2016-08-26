import React from 'react'

import { Row, Col } from 'react-bootstrap'

import Utils from 'utils/Utils.js'

import GoogleMap from 'components-lib/Map/GoogleMap.jsx'

class ServicesMap extends React.Component {

    constructor(props) {
        super(props);
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

    onMapClicked(event) {
        console.log(event);
    }

    _buildCenter() {
        return {
            lattitude: Number(this.props.service.contact.address.lattitude),
            longitude: Number(this.props.service.contact.address.longitude)
        };
    }

  	_buildMarkers() {
        let result = [];
        // Add map center
        result.push({
            lattitude: Number(this.props.service.contact.address.lattitude),
            longitude: Number(this.props.service.contact.address.longitude),
            title: 'Ma société',
            color: 'D9534F'
        })
        // Add customers
        result.push(...Utils.map(this.props.customers, function (c) {
            return {
                id: c.id,
                type: 'C',
                lattitude: c.contact.address.lattitude,
                longitude: c.contact.address.longitude,
                title: c.person.civility + ' ' + c.person.lastName + ' ' + c.person.firstName,
                color: '5CB85C'
            };
        }));
        // Add auxiliaries
        result.push(...Utils.map(this.props.auxiliaries, function (a) {
            return {
                id: a.id,
                type: 'A',
                lattitude: a.contact.address.lattitude,
                longitude: a.contact.address.longitude,
                title: a.person.civility + ' ' + a.person.lastName + ' ' + a.person.firstName,
                color: '5BC0DE'
            };
        }));
        return result;
    }

  	render() {
        return (
            <Row>
                <Col sm={8}>
                    <GoogleMap 
                        center={this._buildCenter()} 
                        onMapClicked={this.onMapClicked}
                        markers={this._buildMarkers()}
                        onMarkerClicked={this.onMarkerClicked} />
                </Col>
                <Col sm={4}>
                ''
                </Col>
            </Row>
        );
    }
}

export default ServicesMap;
