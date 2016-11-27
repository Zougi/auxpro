import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
// Cor modules
import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';
// Custom components
import Footer from 'components/app/Footer.jsx';
import AppPreload from 'components-lib/App/Preload/AppPreload.jsx'
import Navbar from 'components-lib/Navbar/Navbar.jsx'

import HeaderData from './HeaderData.js'

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			preload: ap.preload,
			header: HeaderData.data.header
		};
		ap.listeners.push(this._onPreload.bind(this));
	}


	// State management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('APP_STORE/path', this, this._onAppStorePathUpdate.bind(this));
		HeaderData.register(this._onHeaderDataUpdate.bind(this));
	}
	
	componentWillUnmount() {
		StoreRegistry.unregister('APP_STORE', this);
		HeaderData.unregister();
	}
	_onHeaderDataUpdate(data) {
		this.setState({ 
			header: data.header
		});
	}
	
	_onAppStorePathUpdate() {
		let path = StoreRegistry.getStore('APP_STORE').getData('/path');
		if (path) {
			this.context.router.push(path);
		}
	}
	_onPreload() {
		this.setState({ preload: ap.preload });
	}


	// Callback functions //
	// --------------------------------------------------------------------------------

	onNavigate(url) {
		if (url == "logout") {
			Dispatcher.issue('LOGOUT', {});
			url = "/"
		}	
		Dispatcher.issue('NAVIGATE', {path: url});
	}
	
	
	// Rendering functions //
	// --------------------------------------------------------------------------------

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
						onNavigate = {this.onNavigate}
						brand={this.state.header.brand} 
						rightContent={this.state.header.rightContent} />
				</header>
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
