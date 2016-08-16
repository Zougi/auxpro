import React from 'react';

import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';

import ServicesList from './ServicesList.jsx';

class ServicesBox extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { return (
    	<div>
    		<h2>Sociétés d'aide a domicile</h2>
            <ServicesList services={this.props.services}/>
    	</div>
    );}

    
}

export default ServicesBox;