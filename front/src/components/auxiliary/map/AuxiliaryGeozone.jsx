import React from 'react'

import { Row, Col, Panel, Button } from 'react-bootstrap'

import Utils from 'utils/Utils.js'
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'

let STATES = {
    POSTAL: 'POSTAL',
    POINT: 'POINT'
}

class AuxiliaryGeozone extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = { mode: STATES.POSTAL }
    }

    toggleMode() {
        if (this.state.mode === STATES.POINT) {
            this.setState({ mode: STATES.POSTAL })    
        } else {
            this.setState({ mode: STATES.POINT })
        }
        
    }

    onPostalChanged() {

    }

    onRadiusChanged() {
        
    }

    render() {
        return (
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
                    <FormInput 
                        title='Rayon'
                        defaultValue={this.props.radius} 
                        onChange={this.onRadiusChanged.bind(this)}/>
                </Row>
                }
            </div>
        );
    }
}

export default AuxiliaryGeozone;
