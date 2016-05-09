// Import React core
import React from 'react';
// Import components
import ServiceItem from './ServiceItem.jsx';

class ServicesList extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { 
        var nodes = this.props.data.map(function(user) {
            return (
                <ServiceItem 
                    key={user.name}
                    name={user.name} 
                    email={user.email}
                    tuto={user.tutoSkipped}
                    registration={user.registrationDate}
                    society={user.society}
                    reason={user.socialReason}
                    siret={user.siret}
                    phone={user.phone}/>
            );
        });
        return (
    	<table>    
            <thead>
                <ServiceItem 
                    key='header'
                    name='Nom'
                    email='Address électronique' 
                    tuto='Tutoriaux faits ?'
                    registration="Date d'inscription"
                    society='Société' 
                    lastName='Nom' 
                    reason='Raison sociale' 
                    siret='Numéro de SIRET' 
                    phone='Téléphone'/>
            </thead>
            <tbody>
                {nodes}
            </tbody>
    	</table>
    );}

    
}

export default ServicesList;