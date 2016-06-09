package org.ap.web.entity.mongo;

import java.util.Date;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"_id"})
public class AbsenceBean extends MongoEntity {

	private Date startDate;
	private Date endDate;
	
	@MongoId
	private String auxiliaryId;
	
	public AbsenceBean() {}
	
	public Date getStartDate() { return startDate; }
	public void setStartDate(Date startDate) { this.startDate = startDate; }
	
	public Date getEndDate() { return endDate; }
	public void setEndDate(Date endDate) { this.endDate = endDate; }

	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
}
