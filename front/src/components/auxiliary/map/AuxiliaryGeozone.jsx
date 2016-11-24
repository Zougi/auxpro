import React from 'react'
import { Row, Col } from 'react-bootstrap'
// Custom components
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'
// Lib modules
import Utils from 'utils/Utils.js'

let STATES = {
	POSTAL: 'POSTAL',
	POINT: 'POINT'
}

class AuxiliaryGeozone extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mode: STATES.POSTAL,
			postal: null
		}
	}

	toggleMode() {
		if (this.state.mode === STATES.POINT) {
			this.setState({ mode: STATES.POSTAL })
		} else {
			this.setState({ mode: STATES.POINT })
		}
		if (this.props.onModeChanged) {
			this.props.onModeChanged(this.state.mode);
		}
	}

	onPostalChanged(event) {
		this.setState({ postal: event.value });
	}

	onRadiusChanged(event) {

	}

	render() { return (
		<div>
			<Row>
				<FormSelect
					title='Choisir type'
					defaultValue={'postal'}
					values={[ { key: 'postal', value: 'Par code postal' }, { key: 'point', value: 'Par zone' } ]}
					onChange={this.toggleMode.bind(this)}/>
			</Row>
			<br/>
			{ this.state.mode === STATES.POSTAL ?
			<Row>
				<FormInput
					title='Code postal'
					defaultValue={this.props.postal}
					onChange={this.onPostalChanged.bind(this)}/>
			</Row>
			:
			<Row>
				<div style={{ textAlign: 'center' }}>Sélectionnez un point sur la carte</div>
				<br/>
				<FormInput
					title='Rayon'
					defaultValue={this.props.radius}
					onChange={this.onRadiusChanged.bind(this)}/>
			</Row>
			}
		</div>
	);}
}
export default AuxiliaryGeozone;
