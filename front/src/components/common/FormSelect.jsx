// react modules
import React from 'react'
// react-bootstrap modules
import { Form, FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

class FormSelect extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: '__ALL__',
			class: 'all',
		}
	}

	onSelectionChange(event) {
		event.preventDefault();
		this.state.selected = event.target.value;
		this.state.class = this.state.selected==='__ALL__'?'all':'';
		this.setState(this.state);
	}

	render() { 
		console.log(this.props.values);
		let values = this.props.values.map(function(v) {
			console.log(v);
            return (
                <option className='clear' key={v.key} value={v.value}>{v.value}</option>
            );
        });
		return (
			<FormGroup className='form-select' controlId='formControlsSelect'>
				<Col componentClass={ControlLabel} sm={4}>
					{this.props.title}
				</Col>
				<Col sm={8}>
					<FormControl 
						className={this.state.class}
						componentClass='select' 
						defaultValue='__ALL__' 
						onChange={this.onSelectionChange.bind(this)}>
						<option className='all' key='__ALL__' value='__ALL__'>{this.props.placeholder}</option>
						{values}
					</FormControl>
				</Col>
			</FormGroup>
		);
	}
}

export default FormSelect;