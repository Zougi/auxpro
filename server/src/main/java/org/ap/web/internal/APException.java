package org.ap.web.internal;

import javax.ws.rs.core.Response.Status;

public class APException extends Exception {

	/* STATIC */

	private static final long serialVersionUID = 3941716161128190382L;

	public static final APException NOT_IMPLEMENTED = new APException("NOT_IMPLEMENTED", Status.NOT_IMPLEMENTED);

	public static final APException INVALID_USER = new APException("INVALID_USER", Status.UNAUTHORIZED);
	public static final APException USER_NOT_FOUND = new APException("USER_NOT_FOUND", Status.NOT_FOUND);
	public static final APException USER_NOT_DELETED = new APException("USER_NOT_DELETED", Status.INTERNAL_SERVER_ERROR);
	public static final APException USER_NOT_ADDED = new APException("USER_NOT_ADDED", Status.INTERNAL_SERVER_ERROR);
	
	public static final APException JSON_GENERATION_EX = new APException("JSON_GENERATION_EX", Status.INTERNAL_SERVER_ERROR);
	public static final APException JSON_MAPPING_EX = new APException("JSON_MAPPING_EX", Status.INTERNAL_SERVER_ERROR);
	public static final APException JSON_PARSE_EX = new APException("JSON_PARSE_EX", Status.INTERNAL_SERVER_ERROR);
	public static final APException JSON_PROCESSING_EX = new APException("JSON_PROCESSING_EX", Status.INTERNAL_SERVER_ERROR);
	public static final APException JSON_IO_EX = new APException("JSON_IO_EX", Status.INTERNAL_SERVER_ERROR);

	public static final APException USER_ID_INUSE = new APException("USER_ID_INUSE", Status.BAD_REQUEST);
	public static final APException USER_NAME_INUSE = new APException("USER_NAME_INUSE", Status.BAD_REQUEST);
	public static final APException USER_EMAIL_INUSE = new APException("USER_EMAIL_INUSE", Status.BAD_REQUEST);
	
	public static final APException USER_NAME_INVALID = new APException("USER_NAME_INVALID", Status.BAD_REQUEST);
	public static final APException USER_EMAIL_INVALID = new APException("USER_EMAIL_INVALID", Status.BAD_REQUEST);
	
	public static final APException ABSENCE_HOURS_INVALID = new APException("ABSENCE_HOURS_INVALID", Status.BAD_REQUEST);
	public static final APException ABSENCE_INVALID_AUX = new APException("ABSENCE_INVALID_AUX", Status.BAD_REQUEST);
	
	public static final APException OFFER_NOT_FOUND = new APException("OFFER_NOT_FOUND", Status.NOT_FOUND);
	
	public static final APException MISSION_NOT_FOUND = new APException("MISSION_NOT_FOUND", Status.NOT_FOUND);

	public static final APException AUX_INFO_INVALID = new APException("AUX_INFO_INVALID", Status.BAD_REQUEST);
	
	public static final APException ENTITY_DOES_NOT_EXISTS = new APException("ENTITY_DOES_NOT_EXISTS", Status.BAD_REQUEST);

	public static final APException INVALID_REQUEST_DATA = new APException("INVALID_REQUEST_DATA", Status.BAD_REQUEST);
	public static final APException OPERATION_NOT_ALLOWED = new APException("OPERATION_NOT_ALLOWED", Status.FORBIDDEN);
	
	public static final APException AUXILIARY_NOT_FOUND = new APException("AUXILIARY_NOT_FOUND", Status.NOT_FOUND);
	public static final APException AUXILIARY_INVALID = new APException("AUXILIARY_INVALID", Status.NOT_FOUND);
	
	public static final APException INDISPONIBILITY_NOT_FOUND = new APException("INDISPONIBILITY_NOT_FOUND", Status.NOT_FOUND);
	public static final APException INDISPONIBILITY_AUXILIARY_INVALID = new APException("INDISPONIBILITY_AUXILIARY_INVALID", Status.BAD_REQUEST);
	public static final APException INDISPONIBILITY_AUXILIARY_MISSING = new APException("INDISPONIBILITY_AUXILIARY_MISSING", Status.BAD_REQUEST);
	public static final APException INDISPONIBILITY_MALFORMED = new APException("INDISPONIBILITY_MALFORMED", Status.BAD_REQUEST);
	
	public static final APException SERVICE_NOT_FOUND = new APException("SERVICE_NOT_FOUND", Status.NOT_FOUND);
	public static final APException SERVICE_INVALID = new APException("SERVICE_INVALID", Status.BAD_REQUEST);
	
	public static final APException CUSTOMER_NOT_FOUND = new APException("CUSTOMER_NOT_FOUND", Status.NOT_FOUND);
	public static final APException CUSTOMER_SERVICE_INVALID = new APException("CUSTOMER_SERVICE_INVALID", Status.BAD_REQUEST);
	public static final APException CUSTOMER_SERVICE_MISSING = new APException("CUSTOMER_SERVICE_MISSING", Status.BAD_REQUEST);
	
	public static final APException GEOZONE_NOT_FOUND = new APException("GEOZONE_NOT_FOUND", Status.NOT_FOUND);
	public static final APException GEOZONE_AUXILIARY_INVALID = new APException("GEOZONE_AUXILIARY_INVALID", Status.BAD_REQUEST);
	public static final APException GEOZONE_AUXILIARY_MISSING = new APException("GEOZONE_AUXILIARY_MISSING", Status.BAD_REQUEST);
	
	public static final APException INTERVENTION_NOT_FOUND = new APException("INTERVENTION_NOT_FOUND", Status.NOT_FOUND);
	public static final APException INTERVENTION_SERVICE_INVALID = new APException("INTERVENTION_SERVICE_INVALID", Status.BAD_REQUEST);
	public static final APException INTERVENTION_SERVICE_MISSING = new APException("INTERVENTION_SERVICE_MISSING", Status.BAD_REQUEST);
	public static final APException INTERVENTION_CUSTOMER_INVALID = new APException("INTERVENTION_CUSTOMER_INVALID", Status.BAD_REQUEST);
	public static final APException INTERVENTION_CUSTOMER_MISSING = new APException("INTERVENTION_CUSTOMER_MISSING", Status.BAD_REQUEST);
	
	// MONGO exceptions
	
	public static final APException MONGO_ENTITY_NOT_FOUND = new APException("MONGO_ENTITY_NOT_FOUND", Status.INTERNAL_SERVER_ERROR);

	/* ATTRIBUTES */

	private String _code;
	private Status _status;

	/* CONSTRUCTOR */

	public APException(String code, Status status) {
		this(code, code, status);
	}
	public APException(String msg, String code, Status status) {
		super(msg);
		_code = code;
		_status = status;
	}

	/* METHODS */

	public String getCode() {
		return _code;
	}
	public Status getStatus() {
		return _status;
	}
}
