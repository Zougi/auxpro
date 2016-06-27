package org.ap.web.service.stores.absences;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.internal.APException;

public interface IAbsencesStore {
	
	public AbsenceBean[] getAuxAbsences(String auxId) throws APException;
	
	public AbsenceBean getAbsence(String absId) throws APException;

	public AbsenceBean createAbsence(AbsenceBean bean) throws APException;
	
	public AbsenceBean deleteAbsence(String absId) throws APException;
}
