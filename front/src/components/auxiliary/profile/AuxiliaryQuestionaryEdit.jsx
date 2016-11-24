import React from 'react'
import { Panel, Col, Form, FormGroup, ControlLabel, Radio } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import { APButton } from 'ap-react-bootstrap'
// Lib modules
import Questions from 'utils/constants/Questions'

let DEFAULT_ANSWERS = [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0 
]

class AuxiliaryQuestionaryEdit extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = {
			answers: DEFAULT_ANSWERS
		}
	}


	// State Management functions //
	// --------------------------------------------------------------------------------


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onChange(qIndex, aIndex, event) {
		if (event.target.checked) {
			this.state.answers[qIndex] = aIndex;
			this.setState(this.state);
		}
	}
	onSubmit() {
		this.postQuestionary({ answers: this.state.answers }).
		then(function() {
			return this.loadAuxiliary();
		}.bind(this)).
		then(function() {
			this.onClose();
		}.bind(this)).
		catch(function (error) {
			console.log(error);
		});
	}
	onClose() {
		Dispatcher.issue('NAVIGATE', { path: '/aux/infos/edit' });
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildQuestions() {
		return Questions.QUESTIONS.map(function (question, index) {
			return (
				<div key={index}>
					<h4>{question.title}</h4>
					<FormGroup >
						<ControlLabel>{question.text}</ControlLabel><br/>
						{this._buildAnswers(index, question.answers)}
					</FormGroup>
					<br/>
				</div>
			);
		}.bind(this));
	}

	_buildAnswers(qIndex, answers) {
		return answers.map(function (answer, index) {
			return (
				<Radio inline
					key={qIndex + '-' + index}
					checked={index === this.state.answers[qIndex]}
					onChange={this.onChange.bind(this, qIndex, index)}>
					{answer + ' '}
				</Radio>
			);
		}.bind(this));
	}

	render() {
		return (
			<Panel header={(<strong>Questionnaire Auxiliare</strong>)}>
				<Form>
					{this._buildQuestions.bind(this)()}
				</Form>
				<Col sm={6}>
					<APButton
						block
						text='Annuler'
						onClick={this.onClose.bind(this)} />
				</Col>
				<Col sm={6}>
					<APButton
						block
						bsStyle='success'
						text='Envoyer'
						onClick={this.onSubmit.bind(this)} />
				</Col>
			</Panel>
		);
	}
}
export default AuxiliaryQuestionaryEdit;