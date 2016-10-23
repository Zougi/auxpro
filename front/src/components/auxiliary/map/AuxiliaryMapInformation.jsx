import React from 'react';

import { Panel } from 'react-bootstrap'

class AuxiliaryMapInformation extends React.Component {

	constructor(props) {
		super(props);
	}

    render() { 
        if (!this.props.info) {
            return (<div/>);
        }
        return (
        	<Panel bsStyle={this.props.info.bsStyle} header={this.props.info.header}>
                {this.props.info.name}
                <br/>
                {this.props.info.address1}
                <br/>
                {this.props.info.address2}
                <br/>
            </Panel>
        );
    }    
}

export default AuxiliaryMapInformation;