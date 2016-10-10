import React from 'react'

import StoreRegistry from 'core/StoreRegistry';

import Navbar from 'components-lib/Navbar/Navbar.jsx'

function getSubHeader() {
	return StoreRegistry.getStore('APP_STORE').getData('/app/subHeader');
}

class AppSubHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { subHeader: getSubHeader() };
	}

	componentDidMount() {
		StoreRegistry.register('APP_STORE', this, this.onStoreUpdate.bind(this));
	}

	componentWillUnmount() {
		StoreRegistry.unregister('APP_STORE', this);   
	}
	
	onStoreUpdate() {
		this.setState({ subHeader: getSubHeader() });
	}

	render() { 
		console.log(this.state)
		if (this.state.subHeader && this.state.subHeader.length) {
			console.log('ok')
			return (
				<Navbar leftContent={this.state.subHeader} />
			);
		}
		return (<div/>);
	}
}

export default AppSubHeader;
