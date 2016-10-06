import React from 'react'
import { Panel } from 'react-bootstrap'

class Presentation extends React.Component {

	constructor(props) {
		super(props);
	}

	render() { return (
			<div className='container'>
				<br/>
				<Panel header='Qui sommes nous ?'>
					<p><b>AUXPROS</b> est une plateforme de mise en relation d’organismes d’aides à la personne et d’auxiliaires de vie. Née des expériences accumulées et des réflexions constatées d’un dirigeant d’un service d’aide à la personne et d’un contrôleur de gestion.</p>
					<br/>
					<p><b>AUXPROS</b> a pour objet de répondre aux attentes importantes des intervenantes et de ceux qui les missionnent chez l’usager.</p>
					<br/>
					<p><b>Des besoins :</b></p>
					<p>Les auxiliaires de vie recherchent des missions sur un périmètre d’interventions réduit et un planning optimiser</p>
					<p>Les Services d’aides à la personne recherchent des intervenants qui répondent en compétences et en disponibilités aux demandes et aux besoins de leurs usagers.</p>
					<br/>
					<p><b>Nos réponses :</b></p>
					<p>Permettre cette mise en relation grâce à « un matching » qui tient compte à la fois des demandes, des besoins des usagers et des compétences, de la disponibilité des intervenants ainsi que de leurs zones géographiques d’interventions souhaitées.</p>
					<p>Enfin un outil disponible propre à sécuriser et à soutenir le souhait bien compréhensible de vouloir rester chez soi.</p>	
				</Panel>
			</div>
	);}
}

export default Presentation;