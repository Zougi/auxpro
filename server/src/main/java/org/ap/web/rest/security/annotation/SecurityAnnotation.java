package org.ap.web.rest.security.annotation;

import java.lang.annotation.Annotation;

public enum SecurityAnnotation {
	
	PRIVATE(PrivateInformation.Factory.get()),
	SECRET(SecretInformation.Factory.get()),
	;
	
	private Annotation _annotation;
	
	private SecurityAnnotation(Annotation annotation) {
		_annotation = annotation;
	}
	
	public Annotation get() {
		return _annotation;
	}
}
