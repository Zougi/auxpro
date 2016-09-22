import React from 'react';

import { Button, Panel } from 'react-bootstrap'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Grid, Row, Col } from 'react-bootstrap'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

class Land extends React.Component {

    constructor(props) {
        super(props);
    }
	
	componentDidMount() {
        let logged = StoreRegistry.getStore('LOGIN_STORE').getData('/logged');
		if (logged) {
			this.context.router.push("/home");
		}
    }
	
    guestLogin(event) {
        event.preventDefault();
        let params = {
            user: 'guest', 
            pass: 'guest'
        };
        Dispatcher.issue('LOGON', params);
    }

    render() { 
            return (
            <div className="container">
            	<br/>
            	<Grid>
            		<Row>
            			<Col sm={6} xs={12}>
            				<Panel header="Je recherche un service de soutien à domicile">
	            				<Form horizontal>
    								<FormGroup controlId="formHorizontalEmail">
    									<Col sm={3} componentClass={ControlLabel}>
    										Commune
    									</Col>
    									<Col sm={9}>
    										<FormControl placeholder="Code postal" />
    									</Col>
    								</FormGroup>
    								<FormGroup>
    									<Col smOffset={3} sm={9}>
    										<Button onClick={this.guestLogin}>Valider</Button>
    									</Col>
    								</FormGroup>
    							</Form>
    						</Panel>
            				<Row>
            					<Col sm={6} mdOffset={1} md={5}>
            						<LinkContainer to='/registerAux'>
                        				<Button bsStyle="info" bsSize='large' block>Créer un compte<br/>Auxiliaire de vie</Button>
                    				</LinkContainer>
                    			</Col>
                    			<br className="visible-xs-block"/>
                    			<Col sm={6} md={5}>
                    				<LinkContainer to='/registerSad'>
	                        			<Button bsStyle="primary" bsSize='large' block>Créer un compte<br/>SAD</Button>
    	                			</LinkContainer>
    	                		</Col>
    	                	</Row>
    	                	<br/>
    	                	<Row>
    	                		<Col smOffset={3} sm={6}>
    	                			<LinkContainer to='/login'>
                        				<Button bsStyle="success" bsSize='large' block>Connexion</Button>
                    				</LinkContainer>
                    			</Col>
                    		</Row>
            			</Col>
            		</Row>
            	</Grid>
            	<br/>
            </div>
            );
    };
}

Land.contextTypes = {
	router: React.PropTypes.object
}

export default Land;