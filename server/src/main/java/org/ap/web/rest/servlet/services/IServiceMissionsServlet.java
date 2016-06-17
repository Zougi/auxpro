package org.ap.web.rest.servlet.services;


/**
 * This interface describes the services offers servlet features.
 * The following actions are available:
 *  - /services/{servId}/missions             GET    > list missions for the service
 *  - /services/{servId}/missions/{missionId} GET    > retrieve a mission details
 *  - /services/{servId}/missions/{missionId} POST   > create a new mission for this service
 *  - /services/{servId}/missions/{missionId} PUT    > update an existing mission
 *  - /services/{servId}/missions/{missionId} DELETE > delete a mission
 */
public interface IServiceMissionsServlet {

}
