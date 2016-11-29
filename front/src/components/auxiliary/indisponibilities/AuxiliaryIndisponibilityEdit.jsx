import React from 'react'
import moment from 'moment'
import { Panel, Row, Col, Clearfix, Form } from 'react-bootstrap'
// Core modules
import Dispatcher from 'core/Dispatcher'
import StoreRegistry from 'core/StoreRegistry'
// Custom components
import AuxiliaryBaseComponent from 'components/auxiliary/AuxiliaryBaseComponent'
import FormBuilder from 'components-lib/Form/FormBuilder'
import ButtonsEndDialog from 'components-lib/ButtonsEndDialog/ButtonsEndDialog'
// Lib modules
import Utils from 'utils/Utils'
import Day from 'utils/constants/Day'
import Period from 'utils/constants/Period'
import Validators from 'utils/form/Validators'
import MomentHelper from 'utils/moment/MomentHelper'
import IndisponibilityHelper from 'utils/entities/IndisponibilityHelper'

moment.locale('fr')

let MODES = {
	CREATE: 'CREATE',
	EDIT: 'EDIT'
}

class AuxiliaryIndisponibilityEdit extends AuxiliaryBaseComponent {

	constructor(props) {
		super(props);
		this.state = this._buildState();
	}


	// State Management functions //
	// --------------------------------------------------------------------------------

	componentDidMount() {
		StoreRegistry.register('AUXILIARY_STORE', this, this.onStoreUpdate.bind(this));
	}
	componentWillUnmount() {
		StoreRegistry.unregister('AUXILIARY_STORE', this);
	}
	onStoreUpdate() {
		this.setState(this._buildState());
	}
	_buildState() {
		if (this.props.params.indisponibilityId) {
			let indisponibility = this.getIndisponibility(this.props.params.indisponibilityId);
			return {
				mode: MODES.EDIT,
				indisponibility: indisponibility,
				validationState: IndisponibilityHelper.checkValidation(indisponibility),
			};
		} else {
			return {
				mode: MODES.CREATE,
				indisponibility: {
					auxiliaryId: this.getLoginData('/userId'),
					period: 'ONE',
					startDate: MomentHelper.toLocalDate(moment()),
					endDate: MomentHelper.toLocalDate(moment())
				},
				validationState: false
			};
		}
	}


	// Callbacks functions //
	// --------------------------------------------------------------------------------

	onSaveIndisponibility() {
		let promise;
		if (this.state.mode === MODES.CREATE) {
			promise = this.createIndisponibility(this.state.indisponibility);
		} else {
			promise = this.updateIndisponibility(this.state.indisponibility);
		}
		promise.
		then(this.loadIndisponibilities.bind(this)).
		then(this.onCancel);
	}

	onCancel() {
		Dispatcher.issue('NAVIGATE', {path: '/aux/planning'});
	}

	changeHandler(field) {
		return function (event) {
			let value = event.value || event;
			Utils.setField(this.state.indisponibility, field, value);
			this.setState({ 
				validationState: IndisponibilityHelper.checkValidation(this.state.indisponibility)
			});
		}.bind(this);
	}

	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildTopInfos() {
		let mode = (this.state.mode === MODES.CREATE);
		return [[
			{
				title: '',
				type: 'select',
				edit: true,
				defaultValue: this.state.indisponibility.period,
				changeHandler: this.changeHandler('period'),
				values: Period.PERIODS,
				validator: Validators.NonNull
			}
		], []];
	}

	_buildBottomInfos() {
		let period = Period.getPeriod(this.state.indisponibility.period);
		let startDate = {
			title: 'Début',
			type: 'date',
			edit: true,
			defaultValue: this.state.indisponibility.startDate,
			changeHandler: this.changeHandler('startDate'),
			validator: Validators.NonNull
		};
		let endDate = {
			title: 'Fin',
			type: 'date',
			edit: true,
			defaultValue: this.state.indisponibility.endDate,
			changeHandler: this.changeHandler('endDate'),
			validator: period !== Period.ONE ? Validators.NonNull : null
		};
		let startTime = {
			title: 'De',
			type: 'time',
			edit: true,
			defaultValue: this.state.indisponibility.startTime,
			changeHandler: this.changeHandler('startTime'),
			validator: Validators.NonNull
		};
		let endTime = {
			title: 'A',
			type: 'time',
			edit: true,
			defaultValue: this.state.indisponibility.endTime,
			changeHandler: this.changeHandler('endTime'),
			validator: Validators.NonNull
		};
		let days = {
			title: 'Jours',
			type: 'selectMulti',
			edit: true,
			defaultValue: this.state.indisponibility.days,
			changeHandler: this.changeHandler('days'),
			validator: period !== Period.ONE ? Validators.NonEmptyArray : null,
			values: Day.DAYS
		};
		
		switch (period) {
			case Period.ONE:
				return [[ startDate, startTime, endTime ], [] ];
			case Period.P1W:
			case Period.P2W:
			case Period.P3W:
			case Period.P4W:
				return [[ startDate, endDate, startTime, endTime ], [ days ] ];
		}
	}

	render() {
		let mode = (this.state.mode === MODES.CREATE);
		return (
			<Row>
				<Form horizontal>
					<Panel header={(<strong>{mode ? 'Saisir une nouvelle indisponibilité' : 'Modifier indisponibilité'}</strong>)}>
						<Row>
							{FormBuilder.buildFormGroups(this._buildTopInfos())}
						</Row>
						<Row>
							{FormBuilder.buildFormGroups(this._buildBottomInfos())}
						</Row>
						<ButtonsEndDialog 
							onOk={this.onSaveIndisponibility.bind(this)} 
							okTitle='Enregistrer modifications' 
							okDisabled={!this.state.validationState}
							onCancel={this.onCancel.bind(this)} 
							cancelTitle='Annuler'/>
					</Panel>
				</Form>
				</Row>
		);
	}
}

export default AuxiliaryIndisponibilityEdit;
