// Import React core
import React from 'react';

class ServiceItem extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { return (
    	<tr>
            <td>{this.props.name}</td>
            <td>{this.props.email}</td>
            <td>{this.props.tuto}</td>
            <td>{this.props.registration}</td>
            <td>{this.props.society}</td>
            <td>{this.props.reason}</td>
            <td>{this.props.siret}</td>
            <td>{this.props.phone}</td>
    	</tr>
    );}

    
}

export default ServiceItem;