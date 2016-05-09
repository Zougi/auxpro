// Import React core
import React from 'react';
// Import utilities
import Utils from '../../../utils/Utils';
// Import components
import AuxiliaryItem from './AuxiliaryItem.jsx';

class AuxiliariesList extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { 
        var nodes = this.props.data.map(function(user) {
            return (
                <AuxiliaryItem 
                    key={user.name}
                    name={user.name} 
                    email={user.email}
                    active={user.active}
                    tuto={user.tutoSkipped}
                    registration={user.registrationDate}
                    civility={user.civility}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    birthDate={user.birthDate}
                    birthPlace={user.birthPlace}
                    phone={user.phone}/>
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