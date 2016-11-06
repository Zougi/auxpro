import React from 'react';
import { SplitButton, MenuItem, Panel, Grid, Row, Col, Button } from 'react-bootstrap';

import StoreRegistry from 'core/StoreRegistry';

import InterventionDetailsHeader from './InterventionDetailsHeader.jsx'
import InterventionDetailsOneTime from './InterventionDetailsOneTime.jsx'
import InterventionDetailsRecurence from './InterventionDetailsRecurence.jsx'

import FormSelect from 'components-lib/Form/FormSelect.jsx'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog.jsx';

let STATES = {
	ONE_TIME: 'ONE_TIME',
	RECURENCE: 'RECURENCE'
};

class InterventionDetails extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mode: this.props.intervention ? (this.props.intervention.recurence?STATES.RECURENCE:STATES.ONE_TIME):STATES.ONE_TIME
		};
	}

	onSelectType(state) {
		this.setState({ mode: state });
	}

	onCustomerChanged(customer) {
    	this.setState({ customerId: customer });
    }
	onOneTimeChanged(oneTime) {
		this.setState({ oneTime: oneTime });
	}
	onRecurenceChanged(recurence) {
		this.setState({ recurence: recurence });
	}

	onCancel() {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	}
	onCreate() {
		let data = { 
			id: this.props.intervention ? this.props.intervention.id : null,
			customerId: this.state.customerId || (this.props.intervention ? this.props.intervention.customerId : null) || ((this.props.customers && this.props.customers.length) ? this.props.customers[0].id : ''),
			serviceId: StoreRegistry.getStore('LOGIN_STORE').getData('/id')
		};
		switch (this.state.mode) {
			case STATES.ONE_TIME:
				data.oneTime = this.state.oneTime || (this.props.intervention ? this.props.intervention.oneTime : null);
				break;
			case STATES.RECURENCE:
				data.recurence = this.state.recurence || (this.props.intervention ? this.props.intervention.recurence : null);
				break;
		}
		if (this.props.onCreate) {
			this.props.onCreate(data);
		}
	}

	render() {
		let currentCustomer = null;
		let customers = (this.props.customers || []).map(function(customer) {
			if (this.props.intervention && this.props.intervention.customerId === customer.id) {
				currentCustomer = customer.person.lastName + ' ' + customer.person.firstName;
			}
			return {
				key: customer.id,
				value: customer.person.lastName + ' ' + customer.person.firstName
			};
		}.bind(this));
		let modes = [
			{ key: STATES.ONE_TIME, value: 'Une seule date' },
			{ key: STATES.RECURENCE, value: 'Récurence' }
		];
		return (
			<Panel header={this.props.intervention ? 'Modifier demande' : 'Saisir une nouvelle demande' }>
				<Panel>
					<Row>
						<Col sm={8} md={7} lg={6}>
							<FormSelect 
								edit={this.props.intervention ? false : true}
								title={this.props.intervention ? 'Client' : 'Choisir client'}
								defaultValue={currentCustomer || (customers.length ? customers[0].id : 'Pas de clients')} 
								values={customers}
								onChange={this.onCustomerChanged.bind(this)}/>
						</Col>
					</Row>
					<br/>
					<Row>
						<Col sm={8} md={7} lg={6}>
							<FormSelect 
								edit={this.props.edit}
								title='Type de demande'
								defaultValue={this.state.mode} 
								values={modes}
								onChange={this.onSelectType.bind(this)}/>
						</Col>
					</Row>
				</Panel>
				<Panel>
				{this.state.mode === STATES.ONE_TIME
				?
					<InterventionDetailsOneTime 
						edit={this.props.edit}
						onChange={this.onOneTimeChanged.bind(this)} 
						oneTime={this.props.intervention ? this.props.intervention.oneTime : null}/>
				:
					<InterventionDetailsRecurence
						edit={this.props.edit}
						onChange={this.onRecurenceChanged.bind(this)}
						recurence={this.props.intervention ? this.props.intervention.recurence : null}/>
				}
				</Panel>
				<ButtonsEndDialog 
					onOk={this.onCreate.bind(this)} okTitle={this.props.intervention ? 'Modifier intervention' : 'Créer intervention'}
					onCancel={this.onCancel.bind(this)} cancelTitle='Annuler'/>
			</Panel>
		);
	}
}

export default InterventionDetails;