import React from 'react'

import StoreRegistry from 'core/StoreRegistry';

import Navbar from 'components-lib/Navbar/Navbar.jsx'

class AppHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { header: StoreRegistry.getStore('APP_STORE').getData('/app/header') };
	}

	componentDidMount() {
		StoreRegistry.register('APP_STORE', this, this.onStoreUpdate.bind(this));
	}

	componentWillUnmount() {
		StoreRegistry.unregister('APP_STORE', this);   
	}
	
	onStoreUpdate() {
		this.setState({ header: StoreRegistry.getStore('APP_STORE').getData('/app/header') });
	}

	render() { 
		return (
			<header>
				<Navbar
					inverse={true}
					fixedTop={true}
					brand={this.state.header.brand} 
					rightContent={this.state.header.rightContent} />
			</header>
		);
	}
}

export default AppHeader;
