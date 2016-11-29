import React from 'react'
import moment from 'moment'
import { Row, Col, Glyphicon, OverlayTrigger } from 'react-bootstrap'
// custom components
import ButtonAction from 'components-lib/ButtonAction/ButtonAction'
import SkillSummaryList from 'components/common/skills/SkillSummaryList'

moment.locale('fr');

class CustomerSummaryRenderer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let age = moment(this.props.customer.birthDate).toNow(true);
        let actions = (this.props.actions || []).map(function(action) {
            return (
                <ButtonAction
                    key={this.props.actions.indexOf(action)}
                    bsSize='xsmall' 
                    bsStyle={action.bsStyle} 
                    glyph={action.glyph}
                    tooltip={action.tooltip}
                    onClick={action.callback} />
            );
        }.bind(this))

        return (
            <div>
                <Row>
                    <Col xs={actions.length ? 6 : 12}>
                        {this.props.customer.firstName} {this.props.customer.lastName} - {age}
                    </Col>
                    {actions.length ?
                    <Col style={{textAlign:'right'}} xs={6}>
                        {actions}
                    </Col>
                    : '' }
                </Row>
                <br className='hidden-sm hidden-md hidden-lg'/>
                <Row>
                    <Col sm={12}>
                        <SkillSummaryList skills={this.props.customer}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CustomerSummaryRenderer;