package org.ap.web.entity.constant;

import java.time.Period;

public enum ERecurencePeriod {

	ONE (Period.ofWeeks(0), Period.ofWeeks(0)),
	P1W (Period.ofWeeks(1), Period.ofWeeks(0)),
	P2W (Period.ofWeeks(2), Period.ofWeeks(1)),
	P3W (Period.ofWeeks(3), Period.ofWeeks(2)),
	P4W (Period.ofWeeks(4), Period.ofWeeks(3))
	;
	
	private Period _period;
	private Period _jump;
	private ERecurencePeriod(Period p, Period j) { _period = p; _jump = j;}
	
	public String getId() { return name(); }
	public Period getPeriod() { return _period; }
	public Period getJumpPeriod() { return _jump; }
	
	public static ERecurencePeriod fromString(String id) { 
		for (ERecurencePeriod period : ERecurencePeriod.values()) {
			if (period.getId().equals(id.toUpperCase())) return period;
		}
		return ONE;
	}
}
