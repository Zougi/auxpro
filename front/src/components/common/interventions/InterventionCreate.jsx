// lib modules
import React from 'react';
import moment from 'moment';
import { SplitButton, MenuItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';
// core modules
import StoreRegistry from '../../../core/StoreRegistry';
// custom modules
import { fromLocalDate, toHumanDate, fromLocalTime, toHumanTime, ControlLabel } from '../../../utils/moment/MomentHelper.js'
// custom components
import InterventionEditOneTime from './InterventionEditOneTime.jsx'
import InterventionEditRecurence from './InterventionEditRecurence.jsx'
import FormSelect from '../form/FormSelect.jsx'

moment.locale('fr');

let STATES = {
	ONE_TIME: 'Une seule date',
	RECURENCE: 'Récurente'
};

class InterventionCreate extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			customers: [],
			mode: (props.intervention && props.intervention.recurence) ? STATES.RECURENCE : STATES.ONE_TIME
		};
		this.data = {
			intervention: {
				oneTime: {},
				recurence: {}
			}
		};
	}

	componentDidMount() {
		let user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
        this.state.customers = StoreRegistry.getStore('SERVICE_STORE').getData('/service/' + user.id + '/customers');
        this.state.mode = this.props.recurence?STATES.RECURENCE:STATES.ONE_TIME;
        this.setState(this.state);
        this.data.intervention.customerId = this.state.customers.length ? this.state.customers[0].id : null;
        this.data.intervention.serviceId = user.id;
    }

    
	onSelectType(event) {
		this.state.mode = STATES[event.target.value];
		this.setState(this.state);
	}

	onCustomerSelected(event) {
    	this.data.intervention.customerId = event.target.value;
    	this.setState(this.state);
    }
	onOneTimeChanged(value) {
		console.log(value)
		this.data.intervention.oneTime = value;
	}
	onRecurenceChanged(value) {
		this.data.intervention.recurence = value;
	}

	onCancel() {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}
	onCreate() {
		switch (this.state.mode) {
			case STATES.ONE_TIME:
			delete this.data.intervention.recurence;
				break;
			case STATES.RECURENCE:
				delete this.data.intervention.oneTime;
				break;
		}
		if (this.props.onCreate) {
			this.props.onCreate(this.data);
		}
	}



	render() {
		let customers = this.state.customers.map(function(customer) {
			return {
				key: customer.id,
				value: customer.person.lastName + ' ' + customer.person.firstName
			};
		});
		let modes = [
			{ key: 'ONE_TIME', value: STATES.ONE_TIME },
			{ key: 'RECURENCE', value: STATES.RECURENCE }
		];
		return (
			<Panel header={this.props.title?this.props.title:'Saisir une nouvelle demande'}>
				<Grid>
					<Row>
						<Col sm={8} md={7} lg={6}>
							<FormSelect 
								static={false}
								title='Choisir clients'
								defaultValue={customers.length ? customers[0] : 'Pas de clients'} 
								values={customers}
								onChange={this.onCustomerSelected.bind(this)}/>
						</Col>
					</Row>
					<br/>
					<Row>
						<Col sm={8} md={7} lg={6}>
							<FormSelect 
								static={false}
								title='Type de demande'
								defaultValue={this.state.mode} 
								values={modes}
								onChange={this.onSelectType.bind(this)}/>
						</Col>
					</Row>
					<br/>
					<Col sm={11}>
							{this.state.mode === STATES.ONE_TIME
							?
								<InterventionEditOneTime onChange={this.onOneTimeChanged.bind(this)} oneTime={this.data.intervention.oneTime}/>
							:
								<InterventionEditRecurence onChange={this.onRecurenceChanged.bind(this)}/>
							}
					</Col>
					<br/>
					<ButtonsEndDialog 
						onOk={this.onCreate.bind(this)} okTitle='Creer demande' 
						onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
				</Grid>
			</Panel>
		);
	}
}

export default InterventionCreate;