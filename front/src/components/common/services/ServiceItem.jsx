import React from 'react';

import { Panel } from 'react-bootstrap'

class ServiceItem extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { return (
    	<Panel>
            {this.props.service.society}
            <br/>
            {this.props.service.contact.address.address}
            <br/>
            {this.props.service.contact.address.postalCode} {this.props.service.contact.address.city}
            <br/>
            Email: {this.props.service.contact.email}
            <br/>
            Téléphone: {this.props.service.contact.phone}
    	</Panel>
    );}
}

export default ServiceItem;