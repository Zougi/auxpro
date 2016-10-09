import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import AppPreload from 'components-lib/App/Preload/AppPreload.jsx'

import AppHeader from './AppHeader.jsx';
import AppSubHeader from './AppSubHeader.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { preload: ap.preload };
		ap.listeners.push(this._onPreload.bind(this));
	}

	_onPreload() {
		this.setState({ preload: ap.preload });
	}

	componentDidMount() {
		StoreRegistry.register('LOGIN_STORE', this, this.onLogon.bind(this));
	}

	componentWillUnmount() {
		StoreRegistry.unregister('LOGIN_STORE', this);   
	}
	
	onLogon() {
		let args = {};
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let toHome = function () {
			this.context.router.push('/home/infos');
		}
		if (user.logged) {
			switch (user.type) {
			case 'aux':
				args.auxiliaryId = user.id;
				args.token = user.token;

				Dispatcher.issue('GET_AUXILIARY', args).
				then(function() {
				 	var promises = [];
				 	promises.push(Dispatcher.issue('GET_AUXILIARY_GEOZONES', args));
				 	promises.push(Dispatcher.issue('GET_AUXILIARY_SERVICES', args));
				 	promises.push(Dispatcher.issue('GET_AUXILIARY_CUSTOMERS', args));
				 	return Promise.all(promises);
				}).
				then(function() {
				 	return Dispatcher.issue('GET_AUXILIARY_INTERVENTIONS', args);
				}).
				then(function() {
				 	return Dispatcher.issue('GET_AUXILIARY_OFFERS', args);
				}).
				then(function() {
				 	return Dispatcher.issue('GET_AUXILIARY_INDISPONIBILITIES', args);
				}).
				then(function() {
					console.log('==== DONNES INITIALE AUXILIAIRE ====');
					console.log(StoreRegistry.getStore('AUXILIARY_STORE').getData());
				}).
				then(toHome.bind(this)).
				catch(function(error) {
					console.log("erreur au chargement de l'auxiliare");
					console.log(error);
				});	
				break;
			case 'sad':
				args.serviceId = user.id;
				args.token = user.token;
				
				Dispatcher.issue("GET_SERVICE", args).
				then(function() {
					return Dispatcher.issue('GET_SERVICE_CUSTOMERS', args);
				}).
				then(function() {
					return Dispatcher.issue('GET_SERVICE_INTERVENTIONS', args);
				}).
				then(function() {
					return Dispatcher.issue('GET_SERVICE_OFFERS', args);
				}).
				then(function() {
					return Dispatcher.issue('GET_SERVICE_AUXILIARIES', args);
				}).
				then(function() {
					console.log('==== DONNES INITIALE DU SERVICE ====');
					console.log(StoreRegistry.getStore('SERVICE_STORE').getData());
				}).
				then(toHome.bind(this)).
				catch(function(error) {
					console.log('erreur au chargement du service');
					console.log(error);
				});				
				break;
			default:
				args.token = user.token;
				Dispatcher.issue("GET_SERVICES", args).
				then(toHome.bind(this)).
				catch(function(error) {
					console.log('erreur au chargement des services');
					console.log(error);
				});				
				break;
			}	
			
		} else {
			this.context.router.push("/");
		}
	}
	
	render() { 
		if (!this.state.preload) {
			return (
				<AppPreload/>
			);
		}
		return (
			<div className='ap-app'>
				<AppHeader className='no-print'/>
				<AppSubHeader className='no-print'/>
				{this.props.children}
				<Footer className='no-print'/>
			</div>
		);
	}
}

App.contextTypes = {
	router: React.PropTypes.object
}

export default App;
