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
		StoreRegistry.register('APP_STORE/app', this, this.onAppStoreAppUpdate.bind(this));
		StoreRegistry.register('APP_STORE/path', this, this.onAppStorePathUpdate.bind(this));
	}

	componentWillUnmount() {
		StoreRegistry.unregister('APP_STORE', this);
	}
	
	onAppStoreAppUpdate() {
		this.setState({ 
			header: getHeader(),
			subHeader: getSubHeader()
		});
	}
	
	onAppStorePathUpdate() {
		let path = StoreRegistry.getStore('APP_STORE').getData('/path');
		if (path) {
			this.context.router.push(path);
		}
	}
	
	onNavigate(url) {
		if (url == "logout") {
			Dispatcher.issue('LOGOUT', {});
			url = "/"
		}	
		Dispatcher.issue('NAVIGATE', {path: url});
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
						onNavigate = {this.onNavigate}
						brand={this.state.header.brand} 
						rightContent={this.state.header.rightContent} />
				</header>
				{(this.state.subHeader && this.state.subHeader.leftContent && this.state.subHeader.leftContent.length) ?
					<Navbar 
						className='no-print'
						disabled={this.state.subHeader.disabled}
						leftContent={this.state.subHeader.leftContent}
						onNavigate = {this.onNavigate} />
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
