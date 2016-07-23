package org.ap.web.entity.constant;

import java.time.Period;

public enum ERecurencePeriod {

	WEEK1 (Period.ofWeeks(1)),
	WEEK2 (Period.ofWeeks(2))
	;
	
	private Period _period;
	private ERecurencePeriod(Period p) { _period = p; }
	
	public String getId() { return name().toLowerCase(); }
	public Period getPeriod() { return _period; }
	
	public static ERecurencePeriod fromString(String id) { 
		for (ERecurencePeriod period : ERecurencePeriod.values()) {
			if (period.getId().equals(id.toLowerCase())) return period;
		}
		return WEEK1;
	}
}
