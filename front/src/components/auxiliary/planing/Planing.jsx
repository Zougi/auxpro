// react modules
import React from 'react'
// react-bootstrap modules
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
import DateDay from '../../../utils/date/DateDay.js';
import PlaningHelper from '../../../utils/planing/PlaningHelper.js';

let INITIAL_STATE ={
	day: new DateDay(new Date()),
	mode: 'W'
}

class Planing extends React.Component {
	
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
        Dispatcher.issue('GET_AUXILIARY_MISSIONS', args);
        Dispatcher.issue('GET_AUXILIARY_ABSENCES', args);
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
		for (var i = 0; i < missions.length; i++) {
			var mission = missions[i];
			var date = new Date(mission.date);
			mission.style = 'success';
			this.state.planing.pushDay(date.getFullYear(), date.getMonth(), date.getDate(), mission);
		}
		for (var i = 0; i < absences.length; i++) {
			var absence = absences[i];
			var date = new Date(absence.date);
			absence.style = 'warning';
			this.state.planing.pushDay(date.getFullYear(), date.getMonth(), date.getDate(), absence);
		}
    }

	onDaySelect(day) {
		this.state.day = day;
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
		var user = StoreRegistry.getStore('LOGIN_STORE').getData('/');
		let params = { 
			id: user.id,
			token: user.token,
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
		return (
		<Grid>
			<Row>
				<Col sm={2} md={2} lg={3}>
					<Panel header="Actions" className='no-print'>
						<Button block className='wrap' bsStyle='info' bsSize='small' onClick={this.print.bind(this)}>Imprimer mon planning</Button>
						<br/><p>Afficher mon planning par type de:</p>
						<Form horizontal>
							<FormSelect title='Clients' placeholder='<Tous>' values={values}/>
							<FormSelect title='SAD' placeholder='<Tous>' values={values}/>
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
							day={this.state.day} 
							onModeChanged={this.onModeChanged.bind(this)}
							onDaySelect={this.onDaySelect.bind(this)} 
							planing={this.state.planing}/>
		    		</Col>
		    		<Col sm={2} md={3} lg={4}>
		    			<Panel header="Informations">
		    				<ListGroup>
		    					{days}
		    				</ListGroup>
		    			</Panel>
		    		</Col>
		    		</div>
				):(
					<Col sm={10} md={10} lg={9}>
						<Calendar 
							day={this.state.day}
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

export default Planing;