// Import React core
import React from 'react';
// Import components
import ServiceItem from './ServiceItem.jsx';

class ServicesList extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { 
        var nodes = this.props.data.map(function(sad) {
            return (
                <ServiceItem 
                    key={sad.id}
                    name={sad.user.name} 
                    email={sad.user.email}
                    tuto={sad.user.tutoSkipped}
                    registration={sad.user.registrationDate}
                    society={sad.society}
                    reason={sad.socialReason}
                    siret={sad.siret}
                    phone={sad.contact.phone}/>
            );
        });
        return (
    	<table className="table-striped">
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