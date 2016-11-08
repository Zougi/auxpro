// react modules
import React from 'react'
import { FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';

class SearchBar extends React.Component {
    
    constructor(props) {
		super(props);
		this.state = {
			value: this.props.defaultValue ? this.props.defaultValue : ''
		}
	}

	onChange(event) {
		event.preventDefault();
		if (this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}

	render() {
		return (
			<FormGroup className='ap-seach-bar'>
				<InputGroup>
					<FormControl className='ap-seach-bar-input' type='text' placeholder={this.props.placeholder} onChange={this.onChange.bind(this)}/>
					<InputGroup.Addon>
						<Glyphicon glyph='search'/>
					</InputGroup.Addon>
				</InputGroup>				
			</FormGroup>
		);
	}

}

export default SearchBar;