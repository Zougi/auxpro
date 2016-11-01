import React from 'react';
import { Panel, Col, Button, Form, FormGroup, ControlLabel, Radio } from 'react-bootstrap'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

let QUESTIONS = [
	{
		title:'Question 1',
		text: 'Classer, selon vous l’importance du nombre de demandes des usagers dans les différentes actions d’une auxiliaire de vie',
		answers: [
			'Entretien de la maison',
			'Nursing',
			'Dame de compagnie',
			'Faire la cuisine et le ravitaillement',
			'Petite enfance',
			'Aide administrative',
			'Petit bricolage'
		]
	},
	{
		title:'Question 2',
		text: 'Classer selon vous l’intitulé qui définit le mieux votre profession',
		answers: [
			'Aide-ménagère',
			'Auxiliaire de vie',
			'Dame de compagnie'
		]
	},
	{
		title:'Question 3',
		text: 'Dans laquelle de ces spécificités vous sentez vous le plus d’aptitude',
		answers: [
			'Entretien de la maison',
			'Nursing',
			'Dame de compagnie',
			'Faire la cuisine et le ravitaillement',
			'Petite enfance',
			'Aide administrative',
			'Petit bricolage'
		]
	},
	{
		title:'Question 4',
		text: 'Vous devez intervenir chez un usager pour lui tenir compagnie et faire l’entretien de son appartement par quoi commencez-vous',
		answers: [
			'Lui tenir compagnie',
			'Faire son ménage'
		]
	},
	{
		title:'Question 5',
		text: 'Classer par ordre d’importance, pour l’entretien d’une maison, les différentes pièces',
		answers: [
			'Cuisine',
			'Salle de bain',
			'Salon et chambre'
		]
	},
	{
		title:'Question 6',
		text: 'Classer selon vous, par importance, les critères suivants',
		answers: [
			'La ponctualité',
			'L’hygiène',
			'L’honnêteté',
			'La compréhension des tâches demandées'
		]
	},
	{
		title:'Question 7',
		text: 'Pour vous le ménage:',
		answers: [
			'Implique la connaissance des produits, des surfaces et techniques',
			'S’apprend à la maison'
		]
	},
	{
		title:'Question 8',
		text: 'Les plaques d’induction et vitrocéramique doivent être nettoie avec des produits spécifiques',
		answers: [
			'Il faut d’avantage demander au client les consignes du fabricant pour s’assurer du bon choix du produit',
			'On doit utiliser du vinaigre blanc et une éponge non abrasive',
			'En cas d’inexistence de notice du fabricant je nettoierais avec une lingette microfibre, l’eau chaude et un chiffon propre'
		]
	},
	{
		title:'Question 9',
		text: 'La mission chez un client implique votre passage journalier de 11h a 13h. On vous demande de faire l’entretien de la maison et préparation des repas. Pour ce qui concerne l’entretien quotidien, vous faites systématiquement',
		answers: [
			'Salle de bain, toilette et cuisine',
			'Aspirateur et salle de bain',
			'Les carreaux et poussière'
		]
	},
	{
		title:'Question 10',
		text: 'Classer par ordre d’importance vos priorités lors d’une toilette',
		answers: [
			'L’hygiène',
			'Le confort',
			'Le respect de la personne'
		]
	},
	{
		title:'Question 11',
		text: 'Quand vous arrivez chez une personne le matin par quoi préférez- vous commencer',
		answers: [
			'Sa toilette',
			'La préparationde son petit déjeuner'
		]
	},
	{
		title:'Question 12',
		text: 'Pour réaliser une toilette il vaut mieux',
		answers: [
			'Avoir du bon sens',
			'Respecter toujours les mêmes règles'
		]
	},
	{
		title:'Question 13',
		text: 'Le but d’une toilette c’est',
		answers: [
			'L’hygiène',
			'Apporter du bien être'
		]
	},
	{
		title:'Question 14',
		text: 'Un nursing au quotidien c’est',
		answers: [
			'Passionnant',
			'Impossible'
		]
	},
	{
		title:'Question 15',
		text: 'Pour vous faire une toilette c’est',
		answers: [
			'S’adapter a une situation',
			'appliquer un mode d’emploi'
		]
	},
	{
		title:'Question 16',
		text: 'Pendant la toilette de Mme X, vous rendez compte que sont corps et chaud, que faites-vous',
		answers: [
			'Vous lui donnez plus à manger',
			'Vous essayez de résoudre ce problème',
			'Vous réévaluez la situation le lendemain'
		]
	},
	{
		title:'Question 17',
		text: 'Combien de temps l’utilisez-vous votre téléphone portable par jour',
		answers: [
			'-1h',
			'+1h',
			'+3h'
		]
	},
	{
		title:'Question 18',
		text: 'Selon vous quel est la qualité principale d’une dame de compagnie',
		answers: [
			'L’écoute',
			'La discussion',
			'La culture',
			'La tenue'
		]
	},
	{
		title:'Question 19',
		text: 'Parmi ces trois grands media lequel selon vous est le mieux adapté aux personnes âgées',
		answers: [
			'La presse',
			'Internet',
			'La télévision'
		]
	},
	{
		title:'Question 20',
		text: 'Etre dame de compagnie c’est',
		answers: [
			'Analyser les besoins des personnes et mettre en place des actions',
			'S’assoir à coté d’elle et de lui tenir la main'
		]
	},
	{
		title:'Question 21',
		text: 'De ces 3 aliments lequel privilégiez-vous pour le dîner d’une personne âgée',
		answers: [
			'La viande',
			'Le potage',
			'Le fromage',
			'Les fruits'
		]
	},
	{
		title:'Question 22',
		text: 'La principale difficulté dans la préparation des repas c’est',
		answers: [
			'D’anticiper les achats',
			'Faire les menus',
			'Préparer des repas équilibrés'
		]
	},
	{
		title:'Question 23',
		text: 'Pour donner de l’appétit, classez les critères suivant',
		answers: [
			'L’odeur de la cuisine',
			'La présentation des plats',
			'La qualité des produits utilisés'
		]
	},
	{
		title:'Question 24',
		text: 'Mme X ne veut pas manger, vous',
		answers: [
			'Lui préparez un repas équilibré',
			'Interrogez son entourage pour savoir ce qu’elle aime',
			'Vous n’insistez pas et rapportez la situation à l’infirmière'
		]
	},
	{
		title:'Question 25',
		text: 'S’occuper d’un enfant c’est d’abord',
		answers: [
			'Etre patient',
			'Savoir le distraire',
			'Se faire respecter'
		]
	},
	{
		title:'Question 26',
		text: 'Vous allez chercher un enfant à l’école vous lui achetez son gouter',
		answers: [
			'Avant de l’avoir récupéré',
			'Après l’avoir récupéré'
		]
	},
	{
		title:'Question 27',
		text: 'Pour intéresser un enfant il faut',
		answers: [
			'Connaître ses centres d’intérêts/gouts',
			'Jouer avec lui',
			'L’encourager dans toutes ses activités'
		]
	},
	{
		title:'Question 28',
		text: 'Si l’enfant ne nous obéie pas on doit céder à son désir à fin d’obtenir quelque chose, vrai ou faux',
		answers: [
			'Vrai',
			'Faux'
		]
	},
	{
		title:'Question 29',
		text: 'Chaque année pour déclarer vos revenus',
		answers: [
			'Vous le faites vous-mêmes',
			'Vous demander à un tiers'
		]
	},
	{
		title:'Question 30',
		text: 'Chaque année pour déclarer vos revenus',
		answers: [
			'Vous le faites vous-mêmes',
			'Vous demander à un tiers'
		]
	},
	{
		title:'Question 31',
		text: 'Aider la personne à trier le courrier fait il partie des fonctions de l’auxiliaire de vie ?',
		answers: [
			'Oui',
			'Non'
		]
	},
	{
		title:'Question 32',
		text: 'Vous êtes sollicitée pour constituer le dossier APA de Mme X, vous',
		answers: [
			'Vous demandez à la personne de préparer son avis d’imposition, et contactez son médecin',
			'Vous ne vous sentez pas concernée'
		]
	},
	{
		title:'Question 33',
		text: 'Selon vous le petit bricolage fait il partit des taches d’entretien d’une maison dans l’aide à la personne',
		answers: [
			'Oui',
			'Non'
		]
	},
	{
		title:'Question 34',
		text: 'Lors de votre arrivée chez Mme X, vous constatez qu’il n’y a pas d’électricité',
		answers: [
			'Vous appelez le concierge',
			'Vous appelez l’électricien',
			'Vous allez regarder les fusibles'
		]
	},
	{
		title:'Question 35',
		text: 'Pendant la douche de Mme X, le pommeau de douche se déconnecte',
		answers: [
			'Vous sortez Mme X de la douche et vous appelez un plombier',
			'Vous couvrez Mme X et vous essayez de reconnecter le pommeau provisoirement'
		]
	},
	{
		title:'Question 36',
		text: 'Vous entrez dans l’appartement de Mme X et vous constatez qu’il fait froid et que le chauffage ne marche pas',
		answers: [
			'Vous appelez son fils',
			'Vous appelez l’électricien',
			'Vous vérifiez le fonctionnement de ses appareils'
		]
	},
	{
		title:'Question 37',
		text: 'Pratiquez-vous un sport appartenant à un de ces groupes',
		answers: [
			'Sports de résistance (ex : Natation, course a pied)',
			'Sports d’équipe (ex: volleyball, basquet)',
			'Sport de combat (judo, karaté)',
			'Aucun'
		]
	},
	{
		title:'Question 38',
		text: 'Réalisez-vous régulièrement une de ses activités',
		answers: [
			'Cinéma, Lecture, Visiter de musées',
			'Autres loisirs'
		]
	}
]

class AuxiliaryQuestionnary extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			answers: [
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				0, 0, 0, 0, 0, 0, 0, 0 
			]
		};
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
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state.answers);
		}
	}
	onClose() {
		if (this.props.onClose) {
			this.props.onClose();
		}
	}


	// Rendering functions //
	// --------------------------------------------------------------------------------

	_buildQuestions() {
		return QUESTIONS.map(function (question, index) {
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
			<Panel header='Questionnaire Auxiliare'>
				<Form>
					{this._buildQuestions.bind(this)()}
				</Form>
				<Col sm={6}>
					<Button onClick={this.onClose.bind(this)} block>Annuler</Button>
				</Col>
				<Col sm={6}>
					<Button bsStyle='success' onClick={this.onSubmit.bind(this)} block>Envoyer</Button>
				</Col>
			</Panel>
		);
	}
}
export default AuxiliaryQuestionnary;