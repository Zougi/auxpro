import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
// Custom components
import APButton from 'lib/Button/APButton.jsx'
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'
import GoogleAutocomplete from 'components-lib/Map/GoogleAutocomplete.jsx'

import GeozoneHelper from 'utils/entities/GeozoneHelper.js'

let GEOZONE_TYPE = {
	ZONE: {
		key: 'ZONE',
		value: 'Aux alentours de'
	},
	CITY: {
		key: 'CITY',
		value: 'Par code postal'
	}
}

class AuxiliaryGeozoneEdit extends React.Component {

	constructor(props) {
		super(props);
		if (this.props.geozone ) {
			this.state = { 
				type: this.props.geozone.radius ? GEOZONE_TYPE.ZONE : GEOZONE_TYPE.CITY,
				geozone: this.props.geozone
			}	
		} else {
			this.state = this._buildDefaultState();
		}
	}

	componentWillReceiveProps(props) {
		if (this.state.type === GEOZONE_TYPE.ZONE && props.geozone) {
			let gz = this.state.geozone;
			gz.lattitute = props.geozone.lattitude;
			gz.longitute = props.geozone.longitute;
			this.setState({ geozone: gz });
		}
	}

	_buildDefaultState() {
		return { 
			type: GEOZONE_TYPE.CITY,
			geozone: {
				lattitude: null,
				longitude: null,
				postalCode: '',
				city: ''
			} 
		};
	}

	onCreate() {
		if (this.props.onCreate) {
			this.props.onCreate(this.state.geozone);
		}
	}
	onCancel() {
		if (this.props.onCancel) {
			this.props.onCancel(this.state.geozone);
		}
	}

	onRadiusChanged(event) {
		let gz = this.state.geozone;
		gz.radius = Number(event.value);
		this.setState({ geozone: gz });
		if (this.props.onLiveChange) {
			this.props.onLiveChange(this.state.geozone);
		}
	}

	onAutocompleteChanged(address) {
		this.setState({ 
			geozone: {
				postalCode: address.postalCode,
				city: address.city,
				lattitude: address.lattitude,
				longitude: address.longitude
			}
		});
		if (this.props.onLiveChange) {
			this.props.onLiveChange(this.state.geozone);
		}
	}

	changeType(type) {
		let t = GEOZONE_TYPE[type];
		let geozone = {
			lattitude: null,
			longitude: null
		};
		switch (t) {
			case GEOZONE_TYPE.ZONE:
				geozone.radius = 0;
				break;
			case GEOZONE_TYPE.CITY:
				geozone.postalCode = '';
				geozone.city = '';
				break;
		}
		this.setState({
			geozone: geozone,
			type: t
		});
	}

	render() {
		return (
			<Panel header="Nouvelle zone d'intervention">
				<Row>
				<FormSelect
					title='Choisir type'
					defaultValue={this.state.type.key} 
					values={[ GEOZONE_TYPE.ZONE, GEOZONE_TYPE.CITY ]}
					onChange={this.changeType.bind(this)}/>
				</Row>
				<br/>
				{this.state.type === GEOZONE_TYPE.ZONE ?
				<Row>
					Sélectionnez un point sur la carte:
					<FormInput 
						edit={this.state.geozone.lattitude && true}
						title='Saisir périmètre (en km):'
						value={this.state.geozone.radius} 
						onChange={this.onRadiusChanged.bind(this)}/>
				</Row>
				:
				<div>
					Saisir un code postal:
					<Row>
						<Col xs={12}>
							<GoogleAutocomplete
								edit={true}
								onChange={this.onAutocompleteChanged.bind(this)}
								placeholder={this.state.geozone.postalCode + ', ' + this.state.geozone.city}/>
						</Col>
					</Row>
					<br/>
					<Row>
						<Col sm={6}>
							<FormInput 
								edit={false}
								title='Code postal'
								value={this.state.geozone.postalCode} />
						</Col>
						<Col sm={6}>
							<FormInput 
								edit={false}
								title='Ville'
								value={this.state.geozone.city} />
						</Col>
					</Row>
				</div>
				}
				<br/>
				<Row>
					<Col sm={6}>
						<APButton
							block
							disabled={!GeozoneHelper.isCompleted(this.state.geozone)}
							bsStyle='success'
							onClick={this.onCreate.bind(this)}>
							Enregistrer
						</APButton>
					</Col>
					<Col sm={6}>
						<APButton
							block
							bsStyle='primary'
							onClick={this.onCancel.bind(this)}>
							Annuler
						</APButton>
					</Col>
				</Row>
			</Panel>
		);
	}
}

export default AuxiliaryGeozoneEdit;
