import React from 'react'
import Base from '../Base.jsx';

import { IForm, Row, Col } from '../Lib.jsx';

import { Panel } from 'react-bootstrap'

/*
 * @example
 * <BasicLogin onSubmit={ function (values, event) {} } 
 *             error={true|false}
 *             title='TITLE'
 *             userTitle='USERTITLE'
 *             passTitle='PASSTITLE'/>
 */ 

class BasicLogin extends Base {

	constructor(props) {
		super(props);
		this.FIELDS = [	
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
		this.BUTTONS = {
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
	}
  
	render() {
		return (
			<Row>
				<Col smOffset={1} sm={10} mdOffset={2} md={8}>
					<Panel 
						header={ this.props.error ? this.props.error : this.props.title || 'Saisir les informations utilisateur' } 
						bsStyle={ this.props.error ? 'danger' : 'default' }>
						<IForm onSubmit={this.props.onSubmit} fields={this.FIELDS} buttons={this.BUTTONS}/>
					</Panel>
				</Col>
			</Row>
		);
  }
}

export default BasicLogin;

