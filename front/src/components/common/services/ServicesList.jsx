import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'

import ServiceItem from './ServiceItem.jsx';

class ServicesList extends React.Component {

	constructor(props) {
		super(props);
	}

    _buildServices() {
        return (this.props.services || []).map(function(service) {
            return (
                <Col key={service.user.name} xs={1} sm={2} md={3}>
                    <ServiceItem                         
                        name={service.user.name} 
                        email={service.user.email}
                        tuto={service.user.tutoSkipped}
                        registration={service.user.registrationDate}
                        society={service.society}
                        reason={service.socialReason}
                        siret={service.siret}
                        phone={service.contact.phone}/>
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