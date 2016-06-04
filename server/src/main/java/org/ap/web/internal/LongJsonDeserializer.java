package org.ap.web.internal;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

public class LongJsonDeserializer extends JsonDeserializer<Long> {

	@Override
	public Long deserialize(JsonParser jp, DeserializationContext dc) throws IOException, JsonProcessingException {
		JsonNode node = jp.getCodec().readTree(jp);
		return Long.parseLong(node.get("$numberLong").asText());
	}
}
