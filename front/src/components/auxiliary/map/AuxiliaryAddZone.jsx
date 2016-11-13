import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
// Custom components
import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete'
import APButton from 'lib/Button/APButton'

class AuxiliaryAddZone extends React.Component {

	constructor(props) {
		super(props);
		if (props.location) {
			this.state = {
				radius: 0,
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
		//var nextDefaultLocation = nextProps.location;
		//if (!this.props.location  || (nextDefaultLocation.lattitude != this.props.location.lattitude && nextDefaultLocation.longitude != this.props.location.longitude))
		//	this.getDefaultValue(nextProps)
	}
	
	reverseGeoCodeResult(result, status) {
		if (status === google.maps.GeocoderStatus.OK) {
			this.setState({ defaultValue: result[0].formatted_address });
		} else {
			alert('ReverseGeoCode Error: ' + status);
		}
	}
	
	getDefaultValue(props) {
		if (props.location) {
			var latLng = new google.maps.LatLng(props.location.lattitude, props.location.longitude);
			var geocoder = new google.maps.Geocoder;
			geocoder.geocode({'location': latLng}, this.reverseGeoCodeResult.bind(this));
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
				<input type="number" onChange={this.onRadiusChanged.bind(this)} step="5" disabled={!this.state.lattitude}/>
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
