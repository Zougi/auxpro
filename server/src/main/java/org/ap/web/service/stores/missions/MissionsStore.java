package org.ap.web.service.stores.missions;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;

import com.mongodb.client.FindIterable;

import static com.mongodb.client.model.Filters.*;

import java.util.List;

public class MissionsStore implements IMissionsStore {

	@Override
	public InterventionBean[] getOffers() {
		return null;
	}
	@Override
	public InterventionBean[] getAuxMissions(String id) {
		FindIterable<Document> documents = EMongoCollection.MISSIONS_AFFECTED.getService().findAll(eq("auxiliaryId", id));
		List<InterventionBean> result = BeanConverter.convertToBean(documents, InterventionBean.class);		
		return result.toArray(new InterventionBean[result.size()]);
	}
	@Override
	public AbsenceBean createAuxAbsences(AbsenceBean bean) throws APException {
		Document document = BeanConverter.convertToMongo(bean);
		document = EMongoCollection.ABSENCES.getService().create(document);		
		return BeanConverter.convertToBean(document, AbsenceBean.class);
	}
	@Override
	public AbsenceBean[] getAuxAbsences(String id) throws APException {
		FindIterable<Document> documents = EMongoCollection.ABSENCES.getService().findAll(eq("auxiliaryId", id));
		List<AbsenceBean> result = BeanConverter.convertToBean(documents, AbsenceBean.class);
		return result.toArray(new AbsenceBean[result.size()]);
	}
	@Override
	public InterventionBean[] getSadMissions(String id) throws APException {
		FindIterable<Document> documents = EMongoCollection.MISSIONS_AFFECTED.getService().findAll(eq("serviceId", id));
		List<InterventionBean> result = BeanConverter.convertToBean(documents, InterventionBean.class);
		return result.toArray(new InterventionBean[result.size()]);
	}
	
}
