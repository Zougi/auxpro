import React from 'react'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'

class Redirect extends React.Component {

    constructor(props) {
        super(props);
    }
	
	componentWillMount() {
		 let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (logged) {
			Dispatcher.issue('NAVIGATE', { path: '/'});
		} else {
			Dispatcher.issue('NAVIGATE', { path: '/login'});
		}
    }

    render() {
		return (<div></div>);
    };
}
export default Redirect;