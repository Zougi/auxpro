import React from 'react';

import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

import AuxiliaryHome from '../../auxiliary/AuxiliaryHome.jsx'
import ServiceHome from '../../service/ServiceHome.jsx'
import GuestHome from '../../guest/GuestHome.jsx'

class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (!logged) {
			this.context.router.push('/login');
		}
    }

	render() { 
		let type = StoreRegistry.getStore('LOGIN_STORE').getData('/type');
		switch (type) {
			case 'sad' :
				return (
					<div className='container'>
						<ServiceHome/>
					</div>
				);
			case 'aux' : 
				return (
					<div className='container'>
						<AuxiliaryHome/>
					</div>
				);
			 case 'admin' :
			 case 'guest' :
				return (
					<div className='container'>
						<GuestHome/>
					</div>
				);
			default: 
				return (
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
