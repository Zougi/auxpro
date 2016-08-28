import { Base } from '../Lib.jsx';
import React from 'react'
class Panel extends React.Component {

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