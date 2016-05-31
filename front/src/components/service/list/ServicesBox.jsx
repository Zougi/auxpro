// Import React core
import React from 'react';
// Import utilities
import Utils from '../../../utils/Utils';
// Import core objects
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// Import components
import ServicesList from './ServicesList.jsx';

class ServicesBox extends React.Component {

	constructor(props) {
		super(props);
        
        this.state = {
            data: []
        };
	}

    onServiceUpdate() {
        this.setState({ data: StoreRegistry.getStore('SERVICE_STORE').getData('/services') });
    }

    componentDidMount () {
        StoreRegistry.register('SERVICE_STORE', this, this.onServiceUpdate.bind(this));
        var params = { token: StoreRegistry.getStore('LOGIN_STORE').getData('/token') }
        Dispatcher.issue('GET_SERVICES', params);
    }

    componentWillUnmount () {
        StoreRegistry.unregister('SERVICE_STORE', this);
    }

    render() { return (
    	<div>
    		<h2>Société d'aide a domicile</h2>
            <ServicesList data={this.state.data}/>
    	</div>
    );}

    
}

export default ServicesBox;