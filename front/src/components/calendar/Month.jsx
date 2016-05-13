// react modules
import React from 'react'
// react-bootstrap modules
import { Table } from 'react-bootstrap';
// custom components
import Week from './Week.jsx';
// custom modules
import { DAYS_SHORT } from '../../utils/date/DateConstants.js';

class Month extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() { 
		var weeks = this.props.month.weeks.map(function(week) {
            return (
                <Week key={week.id} week={week}/>
            );
        });
		return (
			<Table condensed responsive>
	            <thead>
	                <tr>
	                	<th className='center'>{DAYS_SHORT[1]}</th>
	                	<th className='center'>{DAYS_SHORT[2]}</th> 
	                	<th className='center'>{DAYS_SHORT[3]}</th>
	                	<th className='center'>{DAYS_SHORT[4]}</th>
	                	<th className='center'>{DAYS_SHORT[5]}</th>
	                	<th className='center'>{DAYS_SHORT[6]}</th>
	                	<th className='center'>{DAYS_SHORT[0]}</th>
	                </tr>
	            </thead>
	            <tbody>
	            {weeks}
	            </tbody>
	        </Table>
		);
	}
}

export default Month;