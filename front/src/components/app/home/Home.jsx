import React from 'react';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import AuxiliaryHome from 'components/auxiliary/AuxiliaryHome.jsx'
import ServiceHome from 'components/service/ServiceHome.jsx'
import GuestHome from 'components/guest/GuestHome.jsx'

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.type = {
			sad: function(nav) {return (<ServiceHome/>) },
			aux: function(nav) {return (<AuxiliaryHome nav={nav}/>) },
			admin: function(nav) {return (<GuestHome/>) },
			guest: function(nav) {return (<GuestHome/>) }
		}
	}
	
	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }

	render() {
		let type = StoreRegistry.getStore('LOGIN_STORE').getData('/type');
		if (this.type[type])
			return (
					<div className='container'>
						{this.type[type](this.props.params.nav)}
					</div>
				);
		else
			return (
					<div className='container'>
						Problème d'authentification
					</div>
				);
	}
}

Home.contextTypes = {
	router: React.PropTypes.object
}

export default Home;
