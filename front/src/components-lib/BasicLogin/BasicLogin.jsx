import React from 'react'
import ReactDOM from 'react-dom'
import { Row, Col } from 'react-bootstrap'
import { Panel } from 'react-bootstrap'

import IForm from '../Form/IForm.jsx';

class BasicLogin extends React.Component {

	constructor(props) {
		super(props);
		
		this.fields = [	
			{	name: "user",
				type: "email",																	//optional
				id: "user",																			//optional
				label: this.props.userTitle || 'Adresse électronique', 				//optional
				placeholder: this.props.userTitle || "Adresse électronique"	//optional			
			},
			{	name: "pass",
				type: "password",																//optional
				id: "pass",																			//optional
				label: this.props.passTitle || "Mot de passe", 						//optional
				placeholder: this.props.passTitle || "Mot de passe"	 			//optional			
			}
		];
		
		this.buttons = {
			submit: { 							//optional
					text: 'Connexion', 		//optional
					bsStyle:'success', 		//optional
					bsSize:'large'				//optional
			},
			cancel: {							//optional
					text: 'Annuler', 			//optional
					bsStyle:'default', 		//optional
					bsSize:'large', 			//optional
					linkContainer:'/'
			}
		}
	}
  
	render() {
		return (
				<Row>
					<Col smOffset={1} sm={10} mdOffset={2} md={8}>
						<Panel 
						header={this.props.error?this.props.error: this.props.title || 'Saisir les informations utilisateur'} 
						bsStyle={this.props.error?'danger':'default'}>
							<IForm onSubmit={this.props.onSubmit} fields={this.fields} buttons={this.buttons}/>
						</Panel>
					</Col>
				</Row>
		);
  }
}

export default BasicLogin;

//EXEMPLE
// onSubmit(values, event) {}
// <BasicLogin 
// onSubmit={onSubmit} 
// error={error}
// title="TITLE"
// userTitle="USERTITLE"
// passTitle="PASSTITLE"/>