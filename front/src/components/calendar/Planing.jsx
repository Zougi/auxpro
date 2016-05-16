// react modules
import React from 'react'
// react-bootstrap modules
import { Grid, Row, Col, Button } from 'react-bootstrap';
// custom components
import Calendar from '../calendar/Calendar.jsx';
// customs modules
import DateDay from '../../utils/date/DateDay.js';
import PlaningHelper from '../../utils/planing/PlaningHelper.js';

class Planing extends React.Component {
	
	constructor(props) {
		super(props);
		let plan = {
			2016: {
				4: {
					18 : 'primary',
					19 : 'info',
					20 : 'success',
					21 : 'warning',
					22 : 'danger'
				}
			}
		}
		this.planing = new PlaningHelper(plan);
		this.state = {
			day: new DateDay(new Date()),
			planing: this.planing
		}
	}
	onDaySelect(day) {
		this.state.day = day;
		this.setState(this.state);
	}
	onSetDayDefault() { this._setDayStatus('default')(); }
	onSetDayPrimary() { this._setDayStatus('primary')(); }
	onSetDayInfo()    { this._setDayStatus('info')(); }
	onSetDaySuccess() { this._setDayStatus('success')(); }
	onSetDayWarning() { this._setDayStatus('warning')(); }
	onSetDayDanger()  { this._setDayStatus('danger')(); }
	_setDayStatus(status) {
		return function() {
			let year = this.state.day.date.getFullYear();
			let month = this.state.day.date.getMonth();
			let day = this.state.day.date.getDate();
			this.planing.setDay(year, month, day, status);
			console.log(this.planing);
			this.state.planing = this.planing;
			this.setState(this.state);
		}.bind(this);
	}
	render() { return (
	<Grid>
		<Row>
			<Col sm={2} md={2} lg={3}>
			<br/>
			<br/>
				<Button block bsStyle='default' onClick={this.onSetDayDefault.bind(this)}>Default</Button>
				<br/>
				<Button block bsStyle='primary' onClick={this.onSetDayPrimary.bind(this)}>Primary</Button>
				<br/>
				<Button block bsStyle='info' onClick={this.onSetDayInfo.bind(this)}>Info</Button>
				<br/>
				<Button block bsStyle='success' onClick={this.onSetDaySuccess.bind(this)}>Success</Button>
				<br/>
				<Button block bsStyle='warning' onClick={this.onSetDayWarning.bind(this)}>Warning</Button>
				<br/>
				<Button block bsStyle='danger' onClick={this.onSetDayDanger.bind(this)}>Danger</Button>
			</Col>
			<Col sm={8} md={7} lg={5}>
				<Calendar onDaySelect={this.onDaySelect.bind(this)} planing={this.state.planing}/>
    		</Col>
    		<Col sm={2} md={3} lg={4}>
    		{this.state.day.id}
    		</Col>
    	</Row>
    </Grid>
	);}
}

export default Planing;