package org.ap.web.entity.mongo;

import java.util.Date;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"_id"})
public class AbsenceBean extends MongoEntity {

	private int startHour;
	private int endHour;
	private Date date;
	
	@MongoId
	private String auxiliaryId;
	
	public AbsenceBean() {}
	
	public int getStartHour() { return startHour; }
	public void setStartHour(int startHour) { this.startHour = startHour; }
	
	public int getEndHour() { return endHour; }
	public void setEndHour(int endHour) { this.endHour = endHour; }

	public Date getDate() { return date; }
	public void setDate(Date date) { this.date = date; }
	
	public String getAuxiliaryId() { return auxiliaryId; }
	public void setAuxiliaryId(String auxiliaryId) { this.auxiliaryId = auxiliaryId; }
}
