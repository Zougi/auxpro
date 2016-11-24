import React from 'react';
import { Panel, Col, Form, FormGroup, ControlLabel, Radio } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import { APButton } from 'lib/Lib'
// Lib modules
import Questions from 'utils/constants/Questions'

class AuxiliaryQuestionary extends AuxiliaryBaseComponent {
	
	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('AUXILIARY_STORE', this, this._onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	_onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		return { 
			answers: this.getAuxiliary().answers
		};
	}

	// Callbacks functions //
	// --------------------------------------------------------------------------------

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
				<Radio inline disabled
					key={qIndex + '-' + index}
					checked={index === this.state.answers[qIndex]} >
					{answer + ' '}
				</Radio>
			);
		}.bind(this));
	}

	render() {
		return (
			<Panel header={(<strong>Mon Questionnaire Auxiliare</strong>)}>
				<Col lg={12}>
					<Form>
						{this._buildQuestions.bind(this)()}
					</Form>
					<APButton
						block
						bsStyle='info'
						text='Retour au profil'
						onClick={this.onClose.bind(this)} />
				</Col>
			</Panel>
		);
	}
}
export default AuxiliaryQuestionary;