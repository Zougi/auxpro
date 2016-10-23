import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

// Initial display
import App  from 'components/app/App.jsx'
import Land from 'components/land/Land.jsx'
// Authentication pages
import Login       from 'components/login/Login.jsx'
import Redirect      from 'components/redirect/Redirect.jsx'
import RegisterAux from 'components/app/auth/RegisterAux.jsx'
import RegisterSad from 'components/app/auth/RegisterSad.jsx'
// Static pages
import About        from 'components/app/static/About.jsx'
import Contact      from 'components/app/static/Contact.jsx'
import CGV          from 'components/app/static/CGV.jsx'
import CGU          from 'components/app/static/CGU.jsx'
import Presentation from 'components/app/static/Presentation.jsx'
// Documentation pages
import Documentation from 'documentation/Documentation.jsx'

import Auxiliary from 'components/auxiliary/Auxiliary.jsx'
import AuxiliaryHome from 'components/auxiliary/home/AuxiliaryHome.jsx'
import AuxiliaryMap from 'components/auxiliary/map/AuxiliaryMap.jsx'
import AuxiliaryPlaning from 'components/auxiliary/planing/AuxiliaryPlaning.jsx'
import AuxiliaryOffers from 'components/auxiliary/offers/AuxiliaryOffers.jsx'
import AuxiliaryProfile from 'components/auxiliary/profile/AuxiliaryProfile.jsx'
import AuxiliaryEdit from 'components/auxiliary/edit/AuxiliaryEdit.jsx'

import Service from 'components/service/Service.jsx'

import GuestHome from 'components/guest/GuestHome.jsx'

function getType() {
	return StoreRegistry.getStore('LOGIN_STORE').getData('/type') || 'offline';
}

class AppRouter extends React.Component {

	constructor(props) {
		super(props);
	}

	onRouteEnter(event) {
		let params = {
			route: {
				path: event.location.pathname

			}
		};
		Dispatcher.issue('ROUTER_CHANGED', params);
	}
	
	render() {
		return (
			<Router history={browserHistory}>
				<Route path='/' component={App} onEnter={this.onRouteEnter}>
					<IndexRoute component={Land}/>
					<Route path='login' component={Login} onEnter={this.onRouteEnter}/>
					<Route path='registerAux' component={RegisterAux} onEnter={this.onRouteEnter}/>
					<Route path='registerSad' component={RegisterSad} onEnter={this.onRouteEnter}/>
					<Route path='presentation' component={Presentation} onEnter={this.onRouteEnter}/>
					<Route path='about' component={About} onEnter={this.onRouteEnter}/>
					<Route path='contact' component={Contact} onEnter={this.onRouteEnter}/>
					
					<Route path='sad/:nav' component={Service} onEnter={this.onRouteEnter}/>
					
					<Route path='aux' component={Auxiliary} onEnter={this.onRouteEnter}>
						<IndexRoute component={AuxiliaryHome}/>	
						<Route path='home' component={AuxiliaryHome} onEnter={this.onRouteEnter}/>
						<Route path='infos' component={AuxiliaryProfile} onEnter={this.onRouteEnter}/>
						<Route path='edit' component={AuxiliaryEdit} onEnter={this.onRouteEnter}/>
						<Route path='planning' component={AuxiliaryPlaning} onEnter={this.onRouteEnter}/>
						<Route path='zone' component={AuxiliaryMap} onEnter={this.onRouteEnter}/>
						<Route path='offres' component={AuxiliaryOffers} onEnter={this.onRouteEnter}/>
					</Route>
					
					<Route path='guest' component={GuestHome} onEnter={this.onRouteEnter}/>
					
				</Route>
				<Route path='doc/:nav' component={Documentation} onEnter={this.onRouteEnter}/>
				<Route path='*' component={Redirect} onEnter={this.onRouteEnter}/>
			</Router>
		);
	}
}

export default AppRouter;
