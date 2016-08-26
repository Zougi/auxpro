import React from 'react';
import { Panel, Row, Button, Form, FormGroup, ControlLabel, Radio } from 'react-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

let QUESTIONS = [
	{ text: 'Taches Ménagères ?', answers: ['0', '1', '2', '3', '4', '5'] },
	{ text: 'Aide à la personne ?', answers: ['0', '1', '2', '3', '4', '5'] },
	{ text: 'Petite enfance ?', answers: ['0', '1', '2', '3', '4', '5'] },
	{ text: 'Courses ?', answers: ['0', '1', '2', '3', '4', '5'] },
	{ text: 'Dame de compagnie ?', answers: ['0', '1', '2', '3', '4', '5'] },
	{ text: 'Aide administrative ?', answers: ['0', '1', '2', '3', '4', '5'] },
	{ text: 'Bricolage ?', answers: ['0', '1', '2', '3', '4', '5'] }
]

class AuxiliaryQuestionnary extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			answers: [0, 0, 0, 0, 0, 0, 0]
		};
	}

	_buildQuestions() {
		return QUESTIONS.map(function (question, index) {
			return (
				<FormGroup key={question.text}>
					<ControlLabel>{question.text}</ControlLabel><br/>
					{this._buildAnswers(index, question.answers)}
				</FormGroup>				
			);
		}.bind(this));
	}

	_buildAnswers(qIndex, answers) {
		return answers.map(function (answer, index) {
			return (
				<Radio key={qIndex + '-' + index} inline checked={index === this.state.answers[qIndex]} onChange={this.onChange.bind(this, qIndex, index)}>
					{answer + ' '}
				</Radio>
			);
		}.bind(this));
	}

	onChange(qIndex, aIndex, event) {
		if (event.target.checked) {
			this.state.answers[qIndex] = aIndex;
			this.setState(this.state);
		}
	}

	onClose() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}

	onValidate() {
		event.preventDefault();
        Dispatcher.issue('POST_AUXILIARY_QUESTIONARY', {
			auxiliaryId: StoreRegistry.getStore('LOGIN_STORE').getData('/id'),
        	token: StoreRegistry.getStore('LOGIN_STORE').getData('/token'),
        	data: {
        		answer0: this.state.answers[0],
        		answer1: this.state.answers[1],
        		answer2: this.state.answers[2],
        		answer3: this.state.answers[3],
        		answer4: this.state.answers[4],
        		answer5: this.state.answers[5],
        		answer6: this.state.answers[6]
        	}
        }).
        then(function () {
        	this.onClose();
        }.bind(this)).
        catch(function (error) {
        	console.log(error);
        });
		
	}

	render() {
		return (
			<Panel header='Questionnaire Auxiliare'>
				<Form>
					{this._buildQuestions.bind(this)()}
				</Form>
				<Row>
					<Button onClick={this.onClose.bind(this)}>Annuler</Button>
					<Button onClick={this.onValidate.bind(this)}>OK</Button>
				</Row>
			</Panel>
		);
	}
}

export default AuxiliaryQuestionnary;