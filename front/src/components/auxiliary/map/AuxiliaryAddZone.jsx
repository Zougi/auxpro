import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
// Custom components
import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete'
import APButton from 'lib/Button/APButton'

class AuxiliaryAddZone extends React.Component {

	constructor(props) {
		super(props);
		if (props.location) {
			let radius = 0
			if (props.location.radius && props.location.radius != 0)
				radius = props.location.radius
			this.state = {
				radius: radius,
				lattitude: props.location.lattitude,
				longitude: props.location.longitude,
				location: props.location
			};
		} else {
			this.state = {
				radius: 0, 
				location: props.location
			};
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.location)
			this.setState({
				lattitude: nextProps.location.lattitude,
				longitude: nextProps.location.longitude,
				location: nextProps.location
			});
			
		if (!nextProps.location.radius && nextProps.location.radius != 0) {
			var change = {
				lattitude: nextProps.location.lattitude,
				longitude: nextProps.location.longitude,
				radius: this.state.radius
			}
			this.props.onChange(change);
		}
	}
	
	onAutocompleteChanged(address) {
		var change = {
			lattitude: address.lattitude,
			longitude: address.longitude,
			radius: this.state.radius
		}
		this.setState({ lattitude: change.lattitude,  longitude: change.longitude});
		this.props.onChange(change);
	}
	
	onRadiusChanged (radius) {
		if (this.state.lattitude) {
			var change = {
				lattitude: this.state.lattitude,
				longitude: this.state.longitude,
				radius: radius.target.value
			}
			this.setState({ radius: change.radius });
			this.props.onChange(change);
		}
	}
	
	valid() {
		if (this.state.lattitude && this.state.radius != 0) {
			var change = {
				lattitude: this.state.lattitude,
				longitude: this.state.longitude,
				radius: this.state.radius
			}
			this.props.valid(change);
		}
	}

	render() {
		return (
			<Panel header="Nouvelle zone d'intervention">
				<GoogleAutocomplete
					edit={true}
					onChange={this.onAutocompleteChanged.bind(this)}
					location={this.state.location}/>
				<p>Distance en mètres  <input type="number" defaultValue={this.state.radius} onChange={this.onRadiusChanged.bind(this)} step="100" disabled={!this.state.lattitude}/></p>
				<APButton block
					bsStyle='success'
					onClick={this.valid.bind(this)}>
					Valider
				</APButton>
			</Panel>
		);
	}
}

export default AuxiliaryAddZone;
