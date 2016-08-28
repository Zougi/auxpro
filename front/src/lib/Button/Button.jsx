import React from 'react'
import Base from '../Base.jsx';

class Button extends Base {

	constructor(props) {
		super(props);
	}
	
	render() { 
		return(
			<button>
				{this.props.children}
			</button>
	);}
}

export default Button;