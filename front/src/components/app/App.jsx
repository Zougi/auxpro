// react modules
import React from 'react';
import ReactDOM from 'react-dom';
// react-router modules
import { Router, Route, hashHistory } from 'react-router'
// core modules
import Dispatcher from '../../core/Dispatcher';
import StoreRegistry from '../../core/StoreRegistry';
// custom components
import Header from './Header.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {

	componentDidMount() {
        StoreRegistry.register('LOGIN_STORE', this, this.onLogon.bind(this));
    }

    componentWillUnmount() {
        StoreRegistry.unregister('LOGIN_STORE', this);   
    }
	
	onLogon() {
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		var toHome = function () {
			this.context.router.push("/home");
		}
		if (user.logged) {
			switch (user.type) {
			case 'aux':
				Dispatcher.issue("GET_AUXILIARY", user).
				then(toHome.bind(this));
				break;
			case 'sad':
				Dispatcher.issue("GET_SERVICE", { serviceId: user.id, token: user.token }).
				then(toHome.bind(this));
				break;
			default:
				toHome();
			}	
			
		} else {
			this.context.router.push("/");
		}
	}

	render() { return (
		<div>
			<Header className='no-print'/>
			{this.props.children}
			<Footer className='no-print'/>
		</div>
	);}
}

App.contextTypes = {
	router: React.PropTypes.object
}

export default App;
