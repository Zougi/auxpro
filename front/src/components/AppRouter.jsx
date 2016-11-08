import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Initial display
import App  from 'components/app/App'
import Land from 'components/land/Land'
// Authentication pages
import Login       from 'components/login/Login'
import Redirect    from 'components/redirect/Redirect'
import RegisterAux from 'components/app/auth/RegisterAux'
import RegisterSad from 'components/app/auth/RegisterSad'
// Static pages
import About        from 'components/app/static/About'
import Contact      from 'components/app/static/Contact'
import CGV          from 'components/app/static/CGV'
import CGU          from 'components/app/static/CGU'
import Presentation from 'components/app/static/Presentation'
import Services     from 'components/app/static/Services'
// Documentation pages
import Documentation from 'documentation/Documentation'

import Auxiliary from 'components/auxiliary/Auxiliary'
import AuxiliaryHome from 'components/auxiliary/home/AuxiliaryHome'
import AuxiliaryTuto from 'components/auxiliary/tuto/AuxiliaryTuto'
import AuxiliaryProfile from 'components/auxiliary/profile/AuxiliaryProfile'
import AuxiliaryProfileEdit from 'components/auxiliary/profile/AuxiliaryProfileEdit'
import AuxiliaryQuestionary from 'components/auxiliary/profile/AuxiliaryQuestionary'
import AuxiliaryQuestionaryEdit from 'components/auxiliary/profile/AuxiliaryQuestionaryEdit'
import AuxiliaryMap from 'components/auxiliary/map/AuxiliaryMap'
import AuxiliaryPlaning from 'components/auxiliary/planing/AuxiliaryPlaning'
import AuxiliaryOffer from 'components/auxiliary/offers/AuxiliaryOffer'
import AuxiliaryOffers from 'components/auxiliary/offers/AuxiliaryOffers'

import Service from 'components/service/Service'
import ServiceHome from 'components/service/home/ServiceHome'
import ServiceTuto from 'components/service/tuto/ServiceTuto'
import ServiceProfile from 'components/service/profile/ServiceProfile'
import ServiceProfileEdit from 'components/service/profile/ServiceProfileEdit'
import ServiceMap from 'components/service/map/ServiceMap'
import ServiceCustomer from 'components/service/customers/ServiceCustomer'
import ServiceCustomers from 'components/service/customers/ServiceCustomers'
import ServiceCustomerEdit from 'components/service/customers/ServiceCustomerEdit'
import ServiceIntervention from 'components/service/interventions/ServiceIntervention'
import ServiceInterventions from 'components/service/interventions/ServiceInterventions'
import ServiceInterventionEdit from 'components/service/interventions/ServiceInterventionEdit'

import GuestHome from 'components/guest/GuestHome'

class AppRouter extends React.Component {

	constructor(props) {
		super(props);
	}
	
	_onUpdate() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<Router history={browserHistory} onUpdate={this._onUpdate}>
				<Route path='/' component={App} >
					<IndexRoute component={Land}/>
					<Route path='login' component={Login} />
					<Route path='registerAux' component={RegisterAux} />
					<Route path='registerSad' component={RegisterSad} />
					<Route path='presentation' component={Presentation} />
					<Route path='services' component={Services} />
					<Route path='about' component={About} />
					<Route path='contact' component={Contact} />
					
					<Route path='sad' component={Service} >
						<IndexRoute component={ServiceHome}/>	

						<Route path='home' component={ServiceHome} />
						<Route path='tuto' component={ServiceTuto} />

						<Route path='infos' component={ServiceProfile} />
						<Route path='infos/edit' component={ServiceProfileEdit} />

						<Route path='zone' component={ServiceMap} />

						<Route path='customers' component={ServiceCustomers} />
						<Route path='customers/new' component={ServiceCustomerEdit} />
						<Route path='customers/:customerId' component={ServiceCustomer} />
						<Route path='customers/:customerId/edit' component={ServiceCustomerEdit} />

						<Route path='interventions' component={ServiceInterventions} />
						<Route path='interventions/new' component={ServiceInterventionEdit} />
						<Route path='interventions/:interventionId' component={ServiceIntervention} />
						<Route path='interventions/:interventionId/edit' component={ServiceInterventionEdit} />
					</Route>
					
					<Route path='aux' component={Auxiliary} >
						<IndexRoute component={AuxiliaryHome}/>	
						
						<Route path='home' component={AuxiliaryHome} />
						<Route path='tuto' component={AuxiliaryTuto} />

						<Route path='infos' component={AuxiliaryProfile} />
						<Route path='infos/edit' component={AuxiliaryProfileEdit} />
						<Route path='infos/questionary' component={AuxiliaryQuestionary} />
						<Route path='infos/questionary/edit' component={AuxiliaryQuestionaryEdit} />

						<Route path='planning' component={AuxiliaryPlaning} />

						<Route path='zone' component={AuxiliaryMap} />

						<Route path='offers' component={AuxiliaryOffers} />
						<Route path='offers/:offerId' component={AuxiliaryOffer} />
					</Route>
					
					<Route path='guest' component={GuestHome} />
					
				</Route>
				<Route path='doc/:nav' component={Documentation}/>
				<Route path='*' component={Redirect} />
			</Router>
		);
	}
}

export default AppRouter;
