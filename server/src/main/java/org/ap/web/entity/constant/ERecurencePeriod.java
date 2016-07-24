package org.ap.web.entity.constant;

import java.time.Period;

public enum ERecurencePeriod {

	P7D (Period.ofWeeks(1)),
	P14D (Period.ofWeeks(2))
	;
	
	private Period _period;
	private ERecurencePeriod(Period p) { _period = p; }
	
	public String getId() { return name(); }
	public Period getPeriod() { return _period; }
	
	public static ERecurencePeriod fromString(String id) { 
		for (ERecurencePeriod period : ERecurencePeriod.values()) {
			if (period.getId().equals(id.toUpperCase())) return period;
		}
		return P7D;
	}
}
