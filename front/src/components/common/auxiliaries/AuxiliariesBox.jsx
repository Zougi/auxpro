// Import React core
import React from 'react';
// Import utilities
import Utils from '../../../utils/Utils';
// Import core objects
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// Import components
import AuxiliariesList from './AuxiliariesList.jsx';

class AuxiliariesBox extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            data: []
        };
	}

    componentDidMount () {
        StoreRegistry.register('AUXILIARY_STORE', this, this.onAuxiliaryUpdate.bind(this));
        var params = { token: StoreRegistry.getStore('LOGIN_STORE').getData('/token') }
        Dispatcher.issue('GET_AUXILIARIES', params);
    }

    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);
    }

    onAuxiliaryUpdate() {
        this.setState({ data: StoreRegistry.getStore('AUXILIARY_STORE').getData('/auxiliaries') });
    }

    render() { return (
    	<div>
    		<h2>Auxiliares de santé</h2>
            <AuxiliariesList data={this.state.data}/>
    	</div>
    );}

    
}

export default AuxiliariesBox;