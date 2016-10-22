import React from 'react';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import Auxiliary from 'components/auxiliary/Auxiliary.jsx'
import ServiceHome from 'components/service/ServiceHome.jsx'
import GuestHome from 'components/guest/GuestHome.jsx'

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			auxiliary: { storeData: StoreRegistry.getStore('AUXILIARY_STORE').getData() },
			service: { storeData: StoreRegistry.getStore('SERVICE_STORE').getData() },
			guest: null,
			admin: null
		}
	}

	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }

	componentDidMount() {
	 	StoreRegistry.register('AUXILIARY_STORE', this, this._onAuxStoreUpdate.bind(this));
	 	StoreRegistry.register('SERVICE_STORE', this, this._onServiceStoreUpdate.bind(this));
    }
    
    componentWillUnmount() {
        StoreRegistry.unregister('AUXILIARY_STORE', this);
        StoreRegistry.unregister('SERVICE_STORE', this);
    }

    _onAuxStoreUpdate() {
    	this.setState({ auxiliary: { storeData: StoreRegistry.getStore('AUXILIARY_STORE').getData() } });
    }

    _onServiceStoreUpdate() {
    	this.setState({ service: { storeData: StoreRegistry.getStore('SERVICE_STORE').getData() } });
    }

	render() {
		let type = StoreRegistry.getStore('LOGIN_STORE').getData('/type');
		switch (type) {
			case 'sad'  : return(<ServiceHome {...this.state.service} nav={this.props.params.nav} query={this.props.location.query}/>);
			case 'admin': return(<GuestHome/>);
			case 'guest': return(<GuestHome/>);
			default: return (
				<div className='container'>
					Problème d'authentification
				</div>
			);
		}
	}
}

Home.contextTypes = {
	router: React.PropTypes.object
}

export default Home;

