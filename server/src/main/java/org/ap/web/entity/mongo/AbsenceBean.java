package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"_id"})
public class AbsenceBean extends MongoEntity {

	private OneTimeBean oneTime;
	private RecurenceBean rec;
	
	@MongoId
	private String auxiliaryId;
	
	public AbsenceBean() {}

	public OneTimeBean getOneTime() { return oneTime; }
	public void setOneTime(OneTimeBean oneTime) { this.oneTime = oneTime; }
	
	public RecurenceBean getRecurence() { return rec; }
	public void setRecurence(RecurenceBean recurence) { this.rec = recurence; }
	
	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
}
