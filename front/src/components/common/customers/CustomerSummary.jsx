import React from 'react';
// custom components
import CustomerSummaryRenderer from './CustomerSummaryRenderer.jsx'

class CustomerSummary extends React.Component {

    constructor(props) {
        super(props);
    }

    onView(event) {
        if (this.props.onView) {
            this.props.onView(this.props.customer);
        }
    }
    onEdit(event) {
        if (this.props.onEdit) {
            this.props.onEdit(this.props.customer);
        }
    }
    onDelete(event) {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.customer);
        }
    }

    render() {
        let actions = [];
        if (this.props.onView) {
            actions.push({ bsStyle: 'default', tooltip: 'Voir informations client', callback: this.onView.bind(this), glyph: 'user'});
        }
        if (this.props.onEdit) {
            actions.push({ bsStyle: 'default', tooltip: 'Editer  informations client', callback: this.onEdit.bind(this), glyph: 'pencil'});
        }
        if (this.props.onDelete) {
            actions.push({ bsStyle: 'danger', tooltip: 'Supprimer client', callback: this.onDelete.bind(this), glyph: 'remove'});
        }

        return (
            <CustomerSummaryRenderer 
                actions={actions}
                customer={this.props.customer} />
        );
    }
}

export default CustomerSummary;