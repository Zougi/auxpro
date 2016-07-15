package org.ap.web.service.stores.offers;

import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.util.List;

public class OffersStore extends StoreBase<OfferBean> implements IOffersStore {

	public OffersStore() {
		super(EMongoCollection.OFFERS, OfferBean.class);
	}
	
	@Override
	public OfferBean[] getCustomerOffers(String serviceId, String customerId) throws APException {
		List<OfferBean> result = getEntityWhere(and(eq("serviceId", serviceId), eq("customerId", customerId)));
		return result.toArray(new OfferBean[result.size()]);
	}
	@Override
	public OfferBean[] getServiceOffers(String serviceId) throws APException {
		List<OfferBean> result = getEntityWhere(eq("serviceId", serviceId));
		return result.toArray(new OfferBean[result.size()]);
	}
	@Override
	public OfferBean[] getAuxiliaryOffers(String auxiliaryId) throws APException {
		List<OfferBean> result = getEntityWhere(eq("auxiliaryId", auxiliaryId));
		return result.toArray(new OfferBean[result.size()]);
	}
	@Override
	public OfferBean createOffer(OfferBean bean) throws APException {
		return createEntity(bean);
	}
	@Override
	public OfferBean getOffer(String id) throws APException {
		return getEntityById(id);
	}
	@Override
	public OfferBean updateOffer(OfferBean bean) throws APException {
		return updateEntity(bean);
	}
	@Override
	public OfferBean deleteOffer(String id) throws APException {
		return deleteEntity(id);
	}
}
