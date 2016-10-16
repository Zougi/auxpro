import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import AppPreload from 'components-lib/App/Preload/AppPreload.jsx'

import Navbar from 'components-lib/Navbar/Navbar.jsx'
import Footer from './Footer.jsx';

function getHeader() {
	return StoreRegistry.getStore('APP_STORE').getData('/app/header');
}

function getSubHeader() {
	return StoreRegistry.getStore('APP_STORE').getData('/app/subHeader');
}

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			preload: ap.preload,
			header: getHeader(),
			subHeader: getSubHeader()
		};
		ap.listeners.push(this._onPreload.bind(this));
	}

	_onPreload() {
		this.setState({ preload: ap.preload });
	}

	componentDidMount() {
		StoreRegistry.register('APP_STORE', this, this.onAppStoreUpdate.bind(this));
		StoreRegistry.register('LOGIN_STORE', this, this.onLogon.bind(this));
	}

	componentWillUnmount() {
		StoreRegistry.unregister('LOGIN_STORE', this);
		StoreRegistry.unregister('APP_STORE', this);
	}
	
	onAppStoreUpdate() {
		this.setState({ 
			header: getHeader(),
			subHeader: getSubHeader()
		});
	}

	onLogon() {
		let args = {};
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let toHome = function () {
			let type = StoreRegistry.getStore('LOGIN_STORE').getData('/type');
			if (type == "aux") {
				this.context.router.push("/aux/home");
			} else {
				this.context.router.push("/home");
			}
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
				<header className='no-print'>
					<Navbar
						className='no-print'
						inverse={true}
						fixedTop={true}
						brand={this.state.header.brand} 
						rightContent={this.state.header.rightContent} />
				</header>
				{(this.state.subHeader && this.state.subHeader.leftContent && this.state.subHeader.leftContent.length) ?
					<Navbar 
						className='no-print'
						disabled={this.state.subHeader.disabled}
						leftContent={this.state.subHeader.leftContent} />
				: '' }
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
