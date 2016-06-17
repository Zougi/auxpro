package org.ap.web.rest.servlet.services;


/**
 * This interface describes the services offers servlet features.
 * The following actions are available:
 *  - /services/{servId}/offers           GET    > list offers for the service
 *  - /services/{servId}/offers/{offerId} GET    > retrieve an offer details
 *  - /services/{servId}/offers/{offerId} POST   > create a new offer for this service
 *  - /services/{servId}/offers/{offerId} PUT    > update an existing offer
 *  - /services/{servId}/offers/{offerId} DELETE > delete an offer
 */
public interface IServiceOffersServlet {

}
