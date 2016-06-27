package org.ap.web.service.stores.absences;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;

import static com.mongodb.client.model.Filters.*;

import java.util.List;

public class AbsencesStore extends StoreBase<AbsenceBean> implements IAbsencesStore {

	public AbsencesStore() {
		super(EMongoCollection.ABSENCES, AbsenceBean.class);
	}
	
	/* METHODS */
	
	@Override
	public AbsenceBean[] getAuxAbsences(String id) throws APException {
		List<AbsenceBean> result = getEntityWhere(eq("auxiliaryId", id));
		return result.toArray(new AbsenceBean[result.size()]);
	}
	@Override
	public AbsenceBean getAbsence(String absId) throws APException {
		return getEntityById(absId);
	}
	@Override
	public AbsenceBean createAbsence(AbsenceBean bean) throws APException {
		return createEntity(bean);
	}
	@Override
	public AbsenceBean deleteAbsence(String id) throws APException {
		return deleteEntity(id);
	}
}
