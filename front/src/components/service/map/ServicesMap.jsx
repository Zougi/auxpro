import React from 'react'

import { Panel, Row, Col } from 'react-bootstrap'

import Utils from 'utils/Utils.js'

import GoogleMap from 'components-lib/Map/GoogleMap.jsx'

import ServiceMapInformation from './ServiceMapInformation.jsx'

class ServicesMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = { info: {} }
    }

    onMarkerClicked(marker) {
        switch(marker.type) {
        case 'A':
            var a = this.props.auxiliaries[marker.id];
            this.setState({ info: {
                bsStyle: 'info',
                header: 'Auxiliaire',
                name : a.person.civility + ' ' + a.person.lastName + ' ' + a.person.firstName,
                address1: a.contact.address.address,
                address2: a.contact.address.postalCode + ' ' + a.contact.address.country
            }});
            break;
        case 'C':
            var c = this.props.customers[marker.id];
            this.setState({ info: {
                bsStyle: 'success',
                header: 'Client',
                name : c.person.civility + ' ' + c.person.lastName + ' ' + c.person.firstName,
                address1: c.contact.address.address,
                address2: c.contact.address.postalCode + ' ' + c.contact.address.country
            }});
            break;
        default:
            this.setState({ info: {
                bsStyle: 'danger',
                header: 'Ma société',
                name : this.props.service.society,
                address1: this.props.service.contact.address.address,
                address2: this.props.service.contact.address.postalCode + ' ' + this.props.service.contact.address.country
            }});
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
                        markers={this._buildMarkers()}
                        onMarkerClicked={this.onMarkerClicked.bind(this)} />
                </Col>
                <Col sm={4}>
                    <ServiceMapInformation
                        bsStyle={this.state.info.bsStyle} 
                        header={this.state.info.header}
                        name={this.state.info.name}
                        address1={this.state.info.address1}
                        address2={this.state.info.address2}/>
                </Col>
            </Row>
        );
    }
}

export default ServicesMap;
