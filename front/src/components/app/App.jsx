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
			HeaderData: HeaderData
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
	_onHeaderDataUpdate() {
		this.setState({ 
			HeaderData: HeaderData
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
	
	
	// Rendering functions //
	// --------------------------------------------------------------------------------

	render() { 
		if (!this.state.preload) {
			return (
				<AppPreload/>
			);
		}
		return (
			<div className='ap-auxpro ap-app'>
				<header className='no-print'>
					<Navbar {...this.state.HeaderData} />
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
