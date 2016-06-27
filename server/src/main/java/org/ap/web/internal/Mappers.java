package org.ap.web.internal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

public enum Mappers {

	DEFAULT(false),
	CLIENT(true),
	;
	
	private ObjectMapper _mapper;
	
	private Mappers(boolean client) {
		_mapper = new ObjectMapper();
		_mapper.findAndRegisterModules();
		if (client) {
			_mapper.setFilterProvider(new SimpleFilterProvider().setFailOnUnknownId(false));
		}
	}
	
	public ObjectMapper getMapper() {
		return _mapper;
	}
}
