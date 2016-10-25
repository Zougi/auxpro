import React from 'react'
import { Panel } from 'react-bootstrap'

class Services extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
		<div className='container'>
			<br/>
			<Panel header='Nos services'>
				<p>Nos services sont :</p>
				<br/>
				<p><b>AUXPROS</b> permet aux <b>Auxiliaires de vie</b> qui recherchent du travail ou qui désirent un complément à leurs activités d’être sollicitées en fonction de leurs compétences, de leurs disponibilités, et de la zone d’intervention géographique souhaitée, de se voir proposer par des organismes de services d’aides à la personne des missions correspondantes.</p>
				<br/>
				<p><b>AUXPROS</b> permet aux <b>Organismes de services d’aides à la personne</b> de connaitre sur une simple consultation les possibilités de réponse aux demandes d’aides faites par un Usager. Et de solliciter les intervenants de proximité potentiellement disponibles qui leurs paraissent réunir les meilleures aptitudes pour satisfaire les besoins.</p>
				<br/>
				<p><b>AUXPROS</b> permets aux <b>Usagers</b> de connaitre tous les organismes d’aides à la personnes existants et de sélectionner parmi toutes les offres de services celles qui lui conviendront le mieux</p>
			</Panel>
		</div>
	);}
}

export default Services;