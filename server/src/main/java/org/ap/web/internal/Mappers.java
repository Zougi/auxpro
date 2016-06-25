package org.ap.web.internal;

import java.util.Date;

import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

public enum Mappers {

	DEFAULT(null, null),
	LOCAL(new DateLocalDeserializer(), null),
	MONGO(new DateJsonDeserializer(), null),
	;
	
	private ObjectMapper _mapper;
	
	private Mappers(JsonDeserializer<Date> dateDS, JsonDeserializer<Long> longDS) {
		_mapper = new ObjectMapper();
		_mapper.findAndRegisterModules();
		SimpleModule module = new SimpleModule();
		if (dateDS != null) {
			module.addDeserializer(Date.class, dateDS);
		}
		if (longDS != null) {
			module.addDeserializer(Long.class, longDS);
		}
		_mapper.registerModule(module);
	}
	
	public ObjectMapper getMapper() {
		return _mapper;
	}
}
