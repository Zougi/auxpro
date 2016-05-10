package org.ap.web.internal;

import java.util.Date;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

public enum Mappers {

	DEFAULT(null),
	MONGO(new DateJsonDeserializer()),
	;
	
	private ObjectMapper _mapper;
	
	private Mappers(JsonDeserializer<Date> deserializer) {
		_mapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		if (deserializer != null) {		
			module.addDeserializer(Date.class, deserializer);
		}
		_mapper.registerModule(module);
	}
	
	public ObjectMapper getMapper() {
		return _mapper;
	}
}
