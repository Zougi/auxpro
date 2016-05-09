// Import React core
import React from 'react';

import { Table, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class FooterTable extends React.Component {

	constructor(props) {
		super(props);

	} 

    render() { 
        var items = this.props.items.map(function(item) {
            return (
                <tr key={item.name}><td>
                    <LinkContainer to={item.url}>
                        <a>{item.name}</a>
                    </LinkContainer>
                </td></tr>
            );
        });
        return (
        <Col sm={4}><Table condensed>
            <thead>
                <tr><th>{this.props.title}</th></tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </Table></Col>
    );}
}

export default FooterTable;