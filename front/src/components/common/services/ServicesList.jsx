import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'

import ServiceItem from './ServiceItem.jsx';

class ServicesList extends React.Component {

	constructor(props) {
		super(props);
	}

    _buildServices() {
        return (this.props.services || []).map(function(service) {
            console.log(service);
            return (
                <Col key={service.id} xs={12} sm={6} md={4}>
                    <ServiceItem                         
                        service={service}/>
                </Col>
            );
        });
    }

    render() { 
        return (
            <Grid>
            	<Row className="ap-service-item">
                    {this._buildServices()}
            	</Row>
            </Grid>
        );
    }    
}

export default ServicesList;