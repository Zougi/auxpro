import React from 'react';

import { Panel } from 'react-bootstrap'

class ServiceItem extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { return (
    	<Panel>
            {this.props.name}
    	</Panel>
    );}

    
}

export default ServiceItem;