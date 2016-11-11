import React from 'react'
import { Panel, Row, Col } from 'react-bootstrap'
// Core modules
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import ServiceBaseComponent from 'components/service/ServiceBaseComponent'
import GoogleMap from 'components-lib/Map/GoogleMap'
import PanelBasic from 'components-lib/Panel/PanelBasic'
// Lib modules
import Utils from 'utils/Utils'

class ServiceMap extends ServiceBaseComponent {

	constructor(props) {
		super(props);
        this.state = this._buildState();
        this.state.info = { text: ['Sélectionnez une entrée sur la carte'] };
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
        switch(marker.type) {
        case 'A':
            var a = this.state.auxiliaries[marker.id];
            this.setState({ info: {
                bsStyle: 'info',
                header: 'Auxiliaire',
                text: [
                    (<strong>{a.civility + ' ' + a.lastName + ' ' + a.firstName}</strong>),
                    a.address,
                    a.postalCode + ' ' + a.country,
                    'Tel   : ' + a.phone,
                    'Email : ' + a.email
                ]
            }});
            break;
        case 'C':
            var c = this.state.customers[marker.id];
            this.setState({ info: {
                bsStyle: 'success',
                header: 'Usager',
                text: [
                    (<strong>{c.civility + ' ' + c.lastName + ' ' + c.firstName}</strong>),
                    c.address,
                    c.postalCode + ' ' + c.city,
                    'Tel   : ' + c.phone,
                    'Email : ' + c.email
                ]
            }});
            break;
        default:
            this.setState({ info: {
                bsStyle: 'danger',
                header: 'Ma société',
                text: [
                    (<strong>{this.state.service.socialReason}</strong>),
                    this.state.service.address,
                    this.state.service.postalCode + ' ' + this.state.service.city
                ]
            }});
            break;
        }
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
            color: 'D9534F',
			onClick: this.onMarkerClicked.bind(this)
        })
        // Add customers
        result.push(...Utils.map(this.state.customers, function (c) {
            return {
                id: c.id,
                type: 'C',
                lattitude: c.lattitude,
                longitude: c.longitude,
                title: c.civility + ' ' + c.lastName + ' ' + c.firstName,
                color: '5CB85C',
				onClick: this.onMarkerClicked.bind(this)
            };
        }.bind(this)));
        // Add auxiliaries
        result.push(...Utils.filter(this.state.auxiliaries, function (auxiliary) {
            return auxiliary._type === 'intervention';
        }).
        map(function (a) {
            return {
                id: a.id,
                type: 'A',
                lattitude: a.lattitude,
                longitude: a.longitude,
                title: a.civility + ' ' + a.lastName + ' ' + a.firstName,
                color: '5BC0DE',
				onClick: this.onMarkerClicked.bind(this)
            };
        }.bind(this)));
        return result;
    }

	render() { 
        return (
        <Row>
            <Panel header={(<strong>Répartition géographique</strong>)} bsStyle='warning'>
                <Col sm={8}>
                    <GoogleMap 
                        center={this._buildCenter()} 
                        markers={this._buildMarkers()} />
                </Col>
                <Col sm={4}>
                    <PanelBasic {...this.state.info} />
                </Col>
            </Panel>
        </Row>
    );}
}

export default ServiceMap;
