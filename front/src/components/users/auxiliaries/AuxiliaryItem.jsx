// Import React core
import React from 'react';

class AuxiliaryItem extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { return (
    	<tr>
            <td>{this.props.name}</td>
            <td>{this.props.email}</td>
            <td>{this.props.active}</td>
            <td>{this.props.tuto}</td>
            <td>{this.props.registration}</td>
            <td>{this.props.civility}</td>
            <td>{this.props.firstName}</td>
            <td>{this.props.lastName}</td>
            <td>{this.props.birthDate}</td>
            <td>{this.props.birthPlace}</td>
            <td>{this.props.phone}</td>
    	</tr>
    );}

    
}

export default AuxiliaryItem;