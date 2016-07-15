package org.ap.web.service.stores.offers;

import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.internal.APException;

public interface IOffersStore {
	
	public OfferBean[] getCustomerOffers(String serviceId, String customerId) throws APException;
	
	public OfferBean[] getServiceOffers(String serviceId) throws APException;
	
	public OfferBean[] getAuxiliaryOffers(String auxiliaryId) throws APException;

	public OfferBean createOffer(OfferBean bean) throws APException;
	
	public OfferBean getOffer(String id) throws APException;
	
	public OfferBean updateOffer(OfferBean bean) throws APException;
	
	public OfferBean deleteOffer(String id) throws APException;	
}
