import React from 'react';
import { Panel, Row, Button } from 'react-bootstrap'

let QUESTIONS = [
	{ text: 'Taches Ménagères ?', answers: ['0', '1', '2', '3', '4', '5', '6'] },
	{ text: 'Aide à la personne', answers: ['0', '1', '2', '3', '4', '5', '6'] },
	{ text: 'Petite enfance', answers: ['0', '1', '2', '3', '4', '5', '6'] },
	{ text: 'Courses', answers: ['0', '1', '2', '3', '4', '5', '6'] },
	{ text: 'Dame de compagnie', answers: ['0', '1', '2', '3', '4', '5', '6'] },
	{ text: 'Aide administrative', answers: ['0', '1', '2', '3', '4', '5', '6'] },
	{ text: 'Bricolage', answers: ['0', '1', '2', '3', '4', '5', '6'] }
]

class AuxiliaryQuestionnary extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	_buildQuestions() {
		return '';
	}

	render() {
		return (
			<Panel header='Questionnaire Auxiliare'>
				{this._buildQuestions.bind(this)()}
				<Row>
					<Button>Annuler</Button>
					<Button>OK</Button>
				</Row>
			</Panel>
		);
	}
}

export default AuxiliaryQuestionnary;