import React from 'react';
import { Col } from 'react-bootstrap'
// Custom Modules
import FormButtonGroup from 'components-lib/Form/FormButtonGroup'
import FormDate from 'components-lib/Form/FormDate'
import FormInput from 'components-lib/Form/FormInput'
import FormGoogleAutocomplete from 'components-lib/Form/FormGoogleAutocomplete'
import FormTextArea from 'components-lib/Form/FormTextArea'
import FormTime from 'components-lib/Form/FormTime'
import FormSelect from 'components-lib/Form/FormSelect'
import FormSelectMulti from 'components-lib/Form/FormSelectMulti'

export default class FormBuilder {
	
	static buildFormGroups(fields) {
		if (fields.length === 1) {
			return (
				<Col lg={12}>
					{fields[0].map(FormBuilder.buildFormGroup)}
				</Col>
			);	
		}
		return (
			<div>
				<Col sm={6}>
					{fields[0].map(FormBuilder.buildFormGroup)}
				</Col>
				<Col sm={6}>
					{fields[1].map(FormBuilder.buildFormGroup)}
				</Col>
			</div>
		);		
	}

	static buildFormGroup(f, i) {
		switch (f.type) {
		case 'input':
			return (
				<FormInput
					key={i}
					validator={f.validator}
					validationState={f.validationState}
					edit={f.edit}
					title={f.title}
					defaultValue={f.defaultValue}
					value={f.value}
					placeholder={f.placeholder}
					onChange={f.changeHandler}/>
			);
		case 'textArea':
			return (
				<FormTextArea
					key={i}
					validator={f.validator}
					edit={f.edit}
					rows={f.rows}
					title={f.title}
					defaultValue={f.defaultValue}
					value={f.value}
					placeholder={f.placeholder}
					onChange={f.changeHandler}/>
			);
		case 'select':
			return (
				<FormSelect
					key={i}
					edit={f.edit}
					title={f.title}
					validator={f.validator}
					defaultValue={f.defaultValue}
					value={f.value}
					placeholder={f.placeholder}
					values={f.values}
					onChange={f.changeHandler}/>
			);
		case 'selectMulti':
			return (
				<FormSelectMulti
					key={i}
					edit={f.edit}
					title={f.title}
					validator={f.validator}
					defaultValue={f.defaultValue}
					value={f.value}
					placeholder={f.placeholder}
					values={f.values}
					onChange={f.changeHandler}/>
			);
		case 'selectGroup':
			return (
				<FormButtonGroup
					key={i}
					edit={f.edit}
					title={f.title}
					validator={f.validator}
					defaultValue={f.defaultValue}
					value={f.value}
					values={f.values}
					onChange={f.changeHandler}/>
			);
		case 'date':
			return (
				<FormDate
					key={i}
					validator={f.validator}
					edit={f.edit}
					title={f.title}
					defaultValue={f.defaultValue}
					value={f.value}
					placeholder={f.placeholder}
					onChange={f.changeHandler}/>
			);
		case 'time':
			return (
				<FormTime
					key={i}
					validator={f.validator}
					edit={f.edit}
					title={f.title}
					defaultValue={f.defaultValue}
					value={f.value}
					placeholder={f.placeholder}
					onChange={f.changeHandler}/>
			);
		case 'googleAutocomplete':
			return (
				<FormGoogleAutocomplete
					key={i}
					edit={f.edit}
					placeholder={f.placeholder}
					onChange={f.changeHandler}/>
			);
		}
	}
}