import React from 'react'
import { Row, Col, Panel } from 'react-bootstrap'
// Custom components
import APButton from 'lib/Button/APButton.jsx'
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'

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
		this.state = { 
			type: GEOZONE_TYPE.CITY,
			geozone: {} 
		}
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

	toggleMode(mode) {
		this.setState({});
	}

	render() {
		return (
			<Panel header="Nouvelle zone d'intervention">
			 	<Row>
                    <FormSelect
                        title='Choisir type'
                        defaultValue={'postal'} 
                        values={[ GEOZONE_TYPE.ZONE, GEOZONE_TYPE.CITY ]}
                        onChange={this.changeMode.bind(this)}/>
                </Row>
                <br/>
				<Row>
					<Col sm={6}>
						<APButton
							block
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
