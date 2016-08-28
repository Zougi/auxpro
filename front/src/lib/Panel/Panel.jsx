import React from 'react'
import Base from '../Base.jsx';

class Panel extends Base {

	constructor(props) {
		super(props);
	}
	
	getContent() {
		if(this.props.body) {
			return (
				<div className="panel-body">
					{this.props.children}
				</div>
			);
		} else {
			return (this.props.children);
		}
	}
	
	render() { 
		return(
			<div className="panel panel-default">
				{this.getContent()}
			</div>
	);}
}

export default Panel;