import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

// Initial display
import App  from 'components/app/App.jsx'
import Land from 'components/app/Land.jsx'
import Home from 'components/app/home/Home.jsx'
// Authentication pages
import Login       from 'components/app/auth/Login.jsx'
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

class APRouter extends React.Component {

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


	_buildRoute(route) {
		if (route.routes) {

		}
		return (
			<Route path={route.path} component={route.component} onEnter={route.onEnter}/>
		);
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path='/' component={App} onEnter={this.onRouteEnter}>
					<IndexRoute component={Land}/>		
					<Route path='/login' component={Login} onEnter={this.onRouteEnter}/>
					<Route path='/registerAux' component={RegisterAux} onEnter={this.onRouteEnter}/>
					<Route path='/registerSad' component={RegisterSad} onEnter={this.onRouteEnter}/>
					<Route path='/home' component={Home} onEnter={this.onRouteEnter}/>
					<Route path='/home/:nav' component={Home} onEnter={this.onRouteEnter}/>

					<Route path='/presentation' component={Presentation} onEnter={this.onRouteEnter}/>
					<Route path='/about' component={About} onEnter={this.onRouteEnter}/>
					<Route path='/contact' component={Contact} onEnter={this.onRouteEnter}/>
				</Route>
				<Route path='/doc/:nav' component={Documentation} onEnter={this.onRouteEnter}/>
			</Router>
		);
	}
}

export default APRouter;
