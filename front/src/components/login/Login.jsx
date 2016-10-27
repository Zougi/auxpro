import React from 'react';

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

import { BasicLogin } from 'lib/Lib.jsx';

class Login extends React.Component {

	constructor(props) {
		super(props);
        this.state = {
            error: ''
        };
	}

    componentDidMount() {
        StoreRegistry.register('ERROR_STORE', this, this.onLogonError.bind(this));
		StoreRegistry.register('LOGIN_STORE', this, this.onLogon.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('ERROR_STORE', this);  
		StoreRegistry.unregister('LOGIN_STORE', this);
    }

	onLogon() {
		let args = {};
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let toHome = function () {
			let type = StoreRegistry.getStore('LOGIN_STORE').getData('/type');
			if (type == "aux") {
				Dispatcher.issue('NAVIGATE', {path: "/aux/home"});
			} else if (type == "sad") {
				Dispatcher.issue('NAVIGATE', {path: "/sad/home"});
			} else if (type == "guest" || type == "admin") {
				Dispatcher.issue('NAVIGATE', {path: "/guest"});
			} else {
				Dispatcher.issue('NAVIGATE', {path: "/"});
			}
		}
		if (user.logged) {
			switch (user.type) {
			case 'aux':
				Dispatcher.issue('NAVIGATE', {path: "/aux/home"});
				break;
			case 'sad':
				Dispatcher.issue('NAVIGATE', {path: "/sad/home"});		
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
			Dispatcher.issue('NAVIGATE', {path: "/"});
		}
	}
	
    onLogonError() {
        let error = StoreRegistry.getStore('ERROR_STORE').getData('/logon/error');
        if (error) {
            this.setState({ error: 'Echec de connexion' });
        }
    }

	onSubmit(values, event) {
		event.preventDefault();
		let params = {
			user: values.user, 
			pass: values.pass
		};
		Dispatcher.issue('LOGON', params);
	}
	
    render() { 

		return (
			<div className='container'>
				<BasicLogin 
					onSubmit={this.onSubmit.bind(this)} 
					error={this.state.error}/>
				<br/>
			</div>
		);}   
	}

export default Login;