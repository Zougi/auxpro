import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'

import IForm from '../Form/IForm.jsx';

/*
 * @example
 * <BasicLogin onSubmit={ function (values, event) {} } 
 *             error={true|false}
 *             title='TITLE'
 *             userTitle='USERTITLE'
 *             passTitle='PASSTITLE'/>
 */ 

let FIELDS = [	
	{	
		name: 'user',
		type: 'email',
		id: 'user',
		label: this.props.userTitle || 'Adresse électronique',
		placeholder: this.props.userTitle || 'Adresse électronique'
	},
	{	
		name: 'pass',
		type: 'password',
		id: 'pass',
		label: this.props.passTitle || 'Mot de passe',
		placeholder: this.props.passTitle || 'Mot de passe'
	}
];

let BUTTONS = {
	submit: {
		text: 'Connexion',
		bsStyle:'success',
		bsSize:'large'
	},
	cancel: {
			text: 'Annuler',
			bsStyle: 'default',
			bsSize: 'large',
			linkContainer: '/'
	}
};

class BasicLogin extends React.Component {

	constructor(props) {
		super(props);
	}
  
	render() {
		return (
				<Row>
					<Col smOffset={1} sm={10} mdOffset={2} md={8}>
						<Panel 
							header={ this.props.error ? this.props.error : this.props.title || 'Saisir les informations utilisateur' } 
							bsStyle={ this.props.error ? 'danger' : 'default' }>
							<IForm onSubmit={this.props.onSubmit} fields={FIELDS} buttons={BUTTONS}/>
						</Panel>
					</Col>
				</Row>
		);
  }
}

export default BasicLogin;

