// react modules
import React from 'react'
// react-bootstrap modules
import { Button } from 'react-bootstrap';

class Day extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			active: false
		};
	}

	onDayClicked() {
		this.setState( { active: !this.state.active } );
	}

	render() { return (
		<td>
			<Button className='day' block active={this.state.active} onClick={this.onDayClicked.bind(this)}>
				{this.props.day.date.getDate()}
			</Button>
		</td>
	);}
}

export default Day;