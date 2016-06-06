package org.ap.web.entity.mongo;

import java.util.Date;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"_id"})
public class AbsenceBean extends MongoEntity {

	private Date startHour;
	private Date endHour;
	
	@MongoId
	private String auxiliaryId;
	
	public AbsenceBean() {}
	
	public Date getStartHour() { return startHour; }
	public void setStartHour(Date startHour) { this.startHour = startHour; }
	
	public Date getEndHour() { return endHour; }
	public void setEndHour(Date endHour) { this.endHour = endHour; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
}
