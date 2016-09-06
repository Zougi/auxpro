import React from 'react'

import { Row, Col, Panel, Button } from 'react-bootstrap'

import Utils from 'utils/Utils.js'
import AuxiliaryGeozone from './AuxiliaryGeozone.jsx'
import FormInput from 'components-lib/Form/FormInput.jsx'
import FormSelect from 'components-lib/Form/FormSelect.jsx'

let STATES = {
    VIEW: 'VIEW',
    ADD: 'ADD'
}

class AuxiliaryGeoPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: STATES.VIEW
        };
    }

    cancel() {
        if (this.props.onModeChanged) {
            this.props.onModeChanged(STATES.VIEW);
        }
        this.setState({ mode: STATES.VIEW })
    }

    toAddMode() {
        if (this.props.onModeChanged) {
            this.props.onModeChanged(STATES.ADD);
        }
        this.setState({ mode: STATES.ADD })
    }

    createGeozone() {

    }

    

    render() {
        switch (this.state.mode) {
        case STATES.VIEW:
            return (
                <Panel>                    
                    <Button block
                        bsStyle='warning'
                        onClick={this.toAddMode.bind(this)}>
                        Ajouter une zone
                    </Button>
                </Panel>
            );
        case STATES.ADD:
            return (
                <Panel>
                    <Button block
                        bsStyle='primary'
                        onClick={this.cancel.bind(this)}>
                        Annuler
                    </Button>
                    <br/>
                    <AuxiliaryGeozone />
                    <br/>
                    <Button block
                        bsStyle='success'
                        onClick={this.createGeozone.bind(this)}>
                        Enregistrer
                    </Button>
                </Panel>
            );
        }
    }
}

export default AuxiliaryGeoPanel;
