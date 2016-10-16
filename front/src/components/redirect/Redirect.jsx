import React from 'react';

import StoreRegistry from 'core/StoreRegistry';

class Redirect extends React.Component {

    constructor(props) {
        super(props);
    }
	
	componentWillMount() {
		 let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (logged)
			this.context.router.push("/home");
		else
			this.context.router.push("/login");
    }

    render() {
		return (<div></div>);
    };
}

Redirect.contextTypes = {
	router: React.PropTypes.object
}

export default Redirect;