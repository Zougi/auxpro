// lib modules
import React from 'react';
import moment from 'moment';
import { Row, Col, Button, Glyphicon, OverlayTrigger } from 'react-bootstrap';
// custom components
import SkillSummaryList from '../skills/SkillSummaryList.jsx'

moment.locale('fr');

class CustomerSummary extends React.Component {
    constructor(props) {
        super(props);
    }

    onView(event) {
        if (this.props.onView) {
            this.props.onView(this.props.data);
        }
    }

    onEdit(event) {
        if (this.props.onEdit) {
            this.props.onEdit(this.props.data);
        }
    }

    render() {
        let age = moment(this.props.data.person.birthDate).toNow(true);

        return (
            <div>
                <Row>
                    <Col xs={6}>
                        {this.props.data.person.firstName} {this.props.data.person.lastName} - {age}
                    </Col>
                    <Col style={{'text-align':'right'}} xs={6}>
                        <Button style={{'margin-right':'5px'}} bsSize='xsmall' bsStyle='default' onClick={this.onView.bind(this)}><Glyphicon glyph='user'/></Button>
                        <Button style={{'margin-right':'5px'}} bsSize='xsmall' bsStyle='default' onClick={this.onEdit.bind(this)}><Glyphicon glyph='pencil'/></Button>
                        <Button bsSize='xsmall' bsStyle='danger'><Glyphicon glyph='remove'/></Button>
                    </Col>
                </Row>
                <br className='hidden-sm hidden-md hidden-lg'/>
                <Row>
                    <Col sm={12}>
                        <SkillSummaryList skills={this.props.data.skills}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CustomerSummary;