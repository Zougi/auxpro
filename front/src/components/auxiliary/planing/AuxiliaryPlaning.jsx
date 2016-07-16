// lib modules
import React from 'react'
import moment from 'moment'
import { Grid, Row, Col, Button, ListGroup, ListGroupItem, Panel } from 'react-bootstrap';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
// core modules
import Dispatcher from '../../../core/Dispatcher';
import StoreRegistry from '../../../core/StoreRegistry';
// custom components
import Calendar from '../../common/calendar/Calendar.jsx';
import FormSelect from '../../common/FormSelect.jsx';
import MissionShort from './MissionShort.jsx';
import AbsenceShort from './AbsenceShort.jsx';
// customs modules
import PlaningHelper from '../../../utils/planing/PlaningHelper.js';

moment.locale('fr');

let INITIAL_STATE ={
	now: moment(),
	display: moment(),
	selected: moment(),
	mode: 'W'
}

class AuxiliaryPlaning extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = INITIAL_STATE;
		this.state.user = this.props.user;
		this.state.data = this.props.data;
		var args = {
			id: this.state.user.id,
			token: this.state.user.token
		}
		this.loadAuxiliary(props);
	}

	componentWillReceiveProps(props) {
		this.onAuxiliaryUpdate(props);
	}

    onAuxiliaryUpdate(props) {
    	this.loadAuxiliary(props);
		this.setState(this.state);
    }

    loadAuxiliary(props) {
		var missions = props.data.missions || [];
    	var absences = props.data.absences || [];
		this.state.planing = new PlaningHelper({});
		let services = [];
		let customers = [];
		for (var i = 0; i < missions.length; i++) {
			let mission = missions[i];
			mission.startDate = moment(mission.startDate);
			mission.endDate = moment(mission.endDate);
			mission.style = 'info';
			mission.text = 'Mission';
			this.state.planing.pushDay(mission.startDate.year(), mission.startDate.month(), mission.startDate.date(), mission);
		}
		for (var i = 0; i < absences.length; i++) {
			let absence = absences[i];
			absence.startDate = moment(absence.startDate)
			absence.endDate = moment(absence.endDate)
			absence.style = 'warning';
			absence.text = 'Absence';
			this.state.planing.pushDay(absence.startDate.year(), absence.startDate.month(), absence.startDate.date(), absence);
		}
    }

	onDaySelect(day) {
		this.state.selected = day;
		this.setState(this.state);
	}
	onModeChanged(mode) {
		this.state.mode = mode;
		this.setState(this.state);
	}

	print() {
		window.print();
	}
	addAbsence() {
		let params = { 
			id: this.state.user.id,
			token: this.state.user.token,
			data: {
				startHour: 0,
				endHour: 24,
				date: this.state.day.date.getTime()
			}
		};
        Dispatcher.issue('POST_AUXILIARY_ABSENCE', params).
        then(function() {
        	delete params.data;
        	Dispatcher.issue('GET_AUXILIARY_ABSENCES', params)
        });
	}

	render() { 
		var values = ['value1', 'value2', '...'];
		var missionsValues = ['planifiees', 'realisees', 'annulees'];
		var servicesValues = [];
		if (this.state.data && this.state.data.services) {
			for (let i = 0 ; i < this.state.data.services.length ; i++) {
				servicesValues.push(StoreRegistry.getStore('SERVICE_STORE').getData('/' + this.state.data.services[i]) + '/society');
			}
		}
		var customersValues = [];
		/*
		var date = this.state.day.date;
		var stuff = this.state.planing.getForDay(date.getFullYear(), date.getMonth(), date.getDate()) || [];
		var days = stuff.map(function(day) {
			var key = day.id + '-' + day.startHour + '-' + day.endHour;
			if (day.style === 'success') {
				return (<MissionShort key={key} date={this.state.day.value} mission={day}/>);
			} else {
				return (<AbsenceShort key={key} date={this.state.day.value} startHour={day.startHour} endHour={day.endHour} service={day.service}/>);
			}
        }.bind(this));
        */
		return (
		<Grid>
			<Row>
				<Col sm={2} md={2} lg={3}>
					<Panel header="Actions" className='no-print'>
						<Button block className='wrap' bsStyle='info' bsSize='small' onClick={this.print.bind(this)}>Imprimer mon planning</Button>
						<br/><p>Afficher mon planning par type de:</p>
						<Form horizontal>
							<FormSelect title='Clients' placeholder='<Tous>' values={values}/>
							<FormSelect title='SAD' placeholder='<Tous>' values={servicesValues}/>
							<FormSelect title='Mission' placeholder='<Tous>' values={missionsValues}/>
      					</Form>
      					<p>Total heures interventions:</p><br/>
						<Button block bsStyle='warning' bsSize='small' onClick={this.addAbsence.bind(this)}>Ajouter une absence</Button>
					</Panel>
				</Col>
				{this.state.mode==='M'
				?(
					<div>
					<Col sm={8} md={7} lg={5}>
						<Calendar 
							now={this.state.now}
							display={this.state.display}
							selected={this.state.selected}
							onModeChanged={this.onModeChanged.bind(this)}
							onDaySelect={this.onDaySelect.bind(this)} 
							planing={this.state.planing}/>
		    		</Col>
		    		<Col sm={2} md={3} lg={4}>
		    			<Panel header="Informations">
		    				<ListGroup>
		    					
		    				</ListGroup>
		    			</Panel>
		    		</Col>
		    		</div>
				):(
					<Col sm={10} md={10} lg={9}>
						<Calendar 
							now={this.state.now}
							display={this.state.display}
							selected={this.state.selected}
							onModeChanged={this.onModeChanged.bind(this)} 
							onDaySelect={this.onDaySelect.bind(this)} 
							planing={this.state.planing}/>
		    		</Col>
				)}
				
	    	</Row>
	    </Grid>
		);
	}
}

export default AuxiliaryPlaning;