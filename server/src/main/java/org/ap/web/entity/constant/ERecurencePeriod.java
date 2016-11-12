package org.ap.web.entity.constant;

import java.time.Period;

public enum ERecurencePeriod {

	ONE (Period.ofWeeks(0)),
	P1W (Period.ofWeeks(1)),
	P2W (Period.ofWeeks(2)),
	P3W (Period.ofWeeks(3)),
	P4W (Period.ofWeeks(4))
	;
	
	private Period _period;
	private ERecurencePeriod(Period p) { _period = p; }
	
	public String getId() { return name(); }
	public Period getPeriod() { return _period; }
	
	public static ERecurencePeriod fromString(String id) { 
		for (ERecurencePeriod period : ERecurencePeriod.values()) {
			if (period.getId().equals(id.toUpperCase())) return period;
		}
		return ONE;
	}
}
