import React from 'react';

import InterventionSummaryRenderer from './InterventionSummaryRenderer.jsx'

class InterventionSummary extends React.Component {
	
	constructor(props) {
		super(props);
	}

	onEdit() {
		if (this.props.onEdit) {
			this.props.onEdit(this.props.intervention);
		}
	}
	onMatch() {
		if (this.props.onMatch) {
			this.props.onMatch(this.props.intervention);
		}
	}
	onDelete() {
		if (this.props.onDelete) {
			this.props.onDelete(this.props.intervention);
		}
	}

	render() {
		return (
			<InterventionSummaryRenderer 
				intervention={this.props.intervention}
				onEdit={this.onEdit.bind(this)}
				onMatch={this.onMatch.bind(this)}
				onDelete={this.onDelete.bind(this)}/>
		);
	}
}

export default InterventionSummary;