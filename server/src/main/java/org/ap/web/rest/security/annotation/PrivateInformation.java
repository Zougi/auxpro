package org.ap.web.rest.security.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.glassfish.hk2.api.AnnotationLiteral;
import org.glassfish.jersey.message.filtering.EntityFiltering;

@Target({ElementType.TYPE, ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@EntityFiltering
public @interface PrivateInformation {

	@SuppressWarnings("all")
	public static class Factory extends AnnotationLiteral<PrivateInformation> implements PrivateInformation {
		private static final long serialVersionUID = 1L;
		private Factory() {
		}
		public static PrivateInformation get() {
			return new Factory();
		}
	}
}