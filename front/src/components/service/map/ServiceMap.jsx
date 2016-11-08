import React from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry.js';
import Utils from 'utils/Utils.js'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent.jsx'
import GoogleMap from 'components-lib/Map/GoogleMap.jsx'
import ServiceHeader from '../ServiceHeader.jsx';
import ServiceMapInformation from './ServiceMapInformation.jsx'

class ServiceMap extends ServiceBaseComponent {

	constructor(props) {
		super(props);
        this.state = this._buildState();
        this.state.info = {};
	}
	

    // State Management functions //
    // --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('SERVICE_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('SERVICE_STORE', this);   
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
    }
     _buildState() {
        return {
            service: this.getService(),
            customers: this.getCustomers(),
            auxiliaries: this.getAuxiliaries()
        };
    }
	

    // Callbacks functions //
    // --------------------------------------------------------------------------------
   
    onMarkerClicked(marker) {
        console.log(marker);
        switch(marker.type) {
        case 'A':
            var a = this.state.auxiliaries[marker.id];
            this.setState({ info: {
                bsStyle: 'info',
                header: 'Auxiliaire',
                name : a.civility + ' ' + a.lastName + ' ' + a.firstName,
                address1: a.address,
                address2: a.postalCode + ' ' + a.country
            }});
            break;
        case 'C':
            var c = this.state.customers[marker.id];
            this.setState({ info: {
                bsStyle: 'success',
                header: 'Client',
                name : c.civility + ' ' + c.lastName + ' ' + c.firstName,
                address1: c.address,
                address2: c.postalCode + ' ' + c.country
            }});
            break;
        default:
            this.setState({ info: {
                bsStyle: 'danger',
                header: 'Ma société',
                name : this.state.service.socialReason,
                address1: this.state.service.address,
                address2: this.state.service.postalCode + ' ' + this.state.service.country
            }});
            break;
        }
    }

    onMapClicked(event) {
        console.log(event);
    }


    // Rendering functions //
    // --------------------------------------------------------------------------------

    _buildCenter() {
        return {
            lattitude: Number(this.state.service.lattitude),
            longitude: Number(this.state.service.longitude)
        };
    }

 	_buildMarkers() {
        let result = [];
        // Add map center
        result.push({
            lattitude: Number(this.state.service.lattitude),
            longitude: Number(this.state.service.longitude),
            title: 'Ma société',
            color: 'D9534F'
        })
        // Add customers
        result.push(...Utils.map(this.state.customers, function (c) {
            return {
                id: c.id,
                type: 'C',
                lattitude: c.lattitude,
                longitude: c.longitude,
                title: c.civility + ' ' + c.lastName + ' ' + c.firstName,
                color: '5CB85C'
            };
        }));
        // Add auxiliaries
        result.push(...Utils.map(this.state.auxiliaries, function (a) {
            return {
                id: a.id,
                type: 'A',
                lattitude: a.lattitude,
                longitude: a.longitude,
                title: a.civility + ' ' + a.lastName + ' ' + a.firstName,
                color: '5BC0DE'
            };
        }));
        return result;
    }

	render() { return (
        <Row>
            <Panel header={(<strong>Répartition géographique</strong>)}>
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
            </Panel>
        </Row>
    );}
}

export default ServiceMap;
