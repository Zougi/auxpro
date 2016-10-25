import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Dispatcher from 'core/Dispatcher';
import StoreRegistry from 'core/StoreRegistry';

// Initial display
import App  from 'components/app/App.jsx'
import Land from 'components/land/Land.jsx'
// Authentication pages
import Login       from 'components/login/Login.jsx'
import Redirect      from 'components/redirect/Redirect.jsx'
import RegisterAux from 'components/app/auth/RegisterAux.jsx'
import RegisterSad from 'components/app/auth/RegisterSad.jsx'
// Static pages
import About        from 'components/app/static/About.jsx'
import Contact      from 'components/app/static/Contact.jsx'
import CGV          from 'components/app/static/CGV.jsx'
import CGU          from 'components/app/static/CGU.jsx'
import Presentation from 'components/app/static/Presentation.jsx'
import Services     from 'components/app/static/Services.jsx'
// Documentation pages
import Documentation from 'documentation/Documentation.jsx'

import Auxiliary from 'components/auxiliary/Auxiliary.jsx'
import AuxiliaryHome from 'components/auxiliary/home/AuxiliaryHome.jsx'
import AuxiliaryProfile from 'components/auxiliary/profile/AuxiliaryProfile.jsx'
import AuxiliaryEdit from 'components/auxiliary/edit/AuxiliaryEdit.jsx'
import AuxiliaryMap from 'components/auxiliary/map/AuxiliaryMap.jsx'
import AuxiliaryPlaning from 'components/auxiliary/planing/AuxiliaryPlaning.jsx'
import AuxiliaryOffer from 'components/auxiliary/offers/AuxiliaryOffer.jsx'
import AuxiliaryOffers from 'components/auxiliary/offers/AuxiliaryOffers.jsx'

import Service from 'components/service/Service.jsx'
import ServiceHome from 'components/service/home/ServiceHome.jsx'
import ServiceProfile from 'components/service/profile/ServiceProfile.jsx'
import ServiceProfileEdit from 'components/service/profile/ServiceProfileEdit.jsx'
import ServiceMap from 'components/service/map/ServiceMap.jsx'
import ServiceCustomer from 'components/service/customers/ServiceCustomer.jsx'
import ServiceCustomers from 'components/service/customers/ServiceCustomers.jsx'
import ServiceCustomerEdit from 'components/service/customers/ServiceCustomerEdit.jsx'
import ServiceIntervention from 'components/service/interventions/ServiceIntervention.jsx'
import ServiceInterventions from 'components/service/interventions/ServiceInterventions.jsx'
import ServiceInterventionEdit from 'components/service/interventions/ServiceInterventionEdit.jsx'

import GuestHome from 'components/guest/GuestHome.jsx'

function getType() {
	return StoreRegistry.getStore('LOGIN_STORE').getData('/type') || 'offline';
}

class AppRouter extends React.Component {

	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Router history={browserHistory}>
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
						<Route path='infos' component={AuxiliaryProfile} />
						<Route path='edit' component={AuxiliaryEdit} />
						<Route path='planning' component={AuxiliaryPlaning} />
						<Route path='zone' component={AuxiliaryMap} />
						<Route path='offres' component={AuxiliaryOffers} />
						<Route path='offres/:offerId' component={AuxiliaryOffer} />
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
