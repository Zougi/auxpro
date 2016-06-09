package org.ap.web.service.stores.missions;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;

import com.mongodb.client.FindIterable;

import static com.mongodb.client.model.Filters.*;

import java.util.List;

public class MissionsStore implements IMissionsStore {

	@Override
	public MissionBean[] getOffers() {
		return null;
	}
	@Override
	public MissionBean[] getAuxMissions(String id) {
		FindIterable<Document> documents = EMongoCollection.MISSIONS_AFFECTED.getService().findAll(eq("auxiliaryId", id));
		List<MissionBean> result = BeanConverter.convertToBean(documents, MissionBean.class);		
		return result.toArray(new MissionBean[result.size()]);
	}
	@Override
	public AbsenceBean createAuxAbsences(AbsenceBean bean) throws APException {
		if (bean.getEndDate().getTime() <= bean.getStartDate().getTime()) throw APException.ABSENCE_HOURS_INVALID;
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
	public MissionBean[] getSadMissions(String id) throws APException {
		FindIterable<Document> documents = EMongoCollection.MISSIONS_AFFECTED.getService().findAll(eq("serviceId", id));
		List<MissionBean> result = BeanConverter.convertToBean(documents, MissionBean.class);
		return result.toArray(new MissionBean[result.size()]);
	}
	
}
