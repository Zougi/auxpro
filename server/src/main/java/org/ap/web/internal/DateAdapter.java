package org.ap.web.internal;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class DateAdapter extends XmlAdapter<String, Date> {

	private static final SimpleDateFormat FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	
	@Override
	public String marshal(Date v) throws Exception {
		return FORMAT.format(v);
	}
	@Override
	public Date unmarshal(String v) throws Exception {
		return FORMAT.parse(v);
	}	
}
