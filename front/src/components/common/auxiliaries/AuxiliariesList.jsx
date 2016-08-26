// Import React core
import React from 'react';
// Import utilities
import Utils from 'utils/Utils';
// Import components
import AuxiliaryItem from './AuxiliaryItem.jsx';

class AuxiliariesList extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { 
        var nodes = this.props.data.map(function(aux) {
            return (
                <AuxiliaryItem 
                    key={aux.id}
                    name={aux.user.name} 
                    email={aux.user.email}
                    active={aux.user.active}
                    tuto={aux.user.tutoSkipped}
                    registration={aux.user.registrationDate}
                    civility={aux.person.civility}
                    firstName={aux.person.firstName}
                    lastName={aux.person.lastName}
                    birthDate={aux.person.birthDate}
                    birthPlace={aux.person.birthPlace}
                    phone={aux.contact.phone}/>
            );
        });
        return (
    	<table className="table-striped">
            <thead>
                <AuxiliaryItem 
                    key='header'
                    name='Nom'
                    email='Address électronique' 
                    active='Compte Actif ?'
                    tuto='Tutoriaux faits ?'
                    registration="Date d'inscription"
                    civility='Civilité'
                    firstName='Prénom' 
                    lastName='Nom' 
                    birthDate='Date de naissance' 
                    birthPlace='Lieu de naissance' 
                    phone='Téléphone'/>
            </thead>
            <tbody>
                {nodes}
            </tbody>
    	</table>
    );}

    
}

export default AuxiliariesList;