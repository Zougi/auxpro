package tools;

import javax.ws.rs.core.Response;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.contact.AddressBean;
import org.ap.web.entity.error.ErrorBean;
import org.ap.web.entity.error.ErrorDetailsBean;
import org.ap.web.entity.user.AuxiliaryBean;
import org.ap.web.entity.user.CredentialsBean;
import org.ap.web.entity.user.ServiceBean;
import org.ap.web.entity.user.UserBean;
import org.ap.web.internal.APException;

import junit.framework.TestCase;

public class AssertHelper {

	public static void assertException(APException expected, Response actual) {
		TestCase.assertEquals(expected.getStatus().getStatusCode(), actual.getStatus());
		assertError(BeanConverter.convert(expected), actual.readEntity(ErrorBean.class));		
	}

	public static void assertError(ErrorBean expected, ErrorBean actual) {
		assertError(expected.getError(), actual.getError());
	}
	public static void assertError(ErrorDetailsBean expected, ErrorDetailsBean actual) {
		TestCase.assertEquals(expected.getCode(), actual.getCode());
		TestCase.assertEquals(expected.getMessage(), actual.getMessage());
	}

	public static void assertCredentials(CredentialsBean expected, CredentialsBean actual) {
		TestCase.assertEquals(expected.getName(), actual.getName());
		TestCase.assertEquals(expected.getEmail(), actual.getEmail());
	}

	public static void assertUser(UserBean expected, UserBean actual) {
		assertCredentials(expected, actual);
		TestCase.assertEquals(expected.getActive(), actual.getActive());
		TestCase.assertEquals(expected.getTutoSkipped(), actual.getTutoSkipped());
		TestCase.assertEquals(expected.getType(), actual.getType());
		TestCase.assertEquals(expected.getRegistrationDate(), actual.getRegistrationDate());
	}

	public static void assertAuxiliary(AuxiliaryBean expected, AuxiliaryBean actual) {
		assertUser(expected, actual);
		TestCase.assertEquals(expected.getCivility(), actual.getCivility());
		TestCase.assertEquals(expected.getFirstName(), actual.getFirstName());
		TestCase.assertEquals(expected.getLastName(), actual.getLastName());
		TestCase.assertEquals(expected.getBirthPlace(), actual.getBirthPlace());
		TestCase.assertEquals(expected.getBirthDate(), actual.getBirthDate());
		TestCase.assertEquals(expected.getPhone(), actual.getPhone());
		assertAddress(expected.getAddress(), actual.getAddress());
	}

	public static void assertService(ServiceBean expected, ServiceBean actual) {
		assertUser(expected, actual);
		TestCase.assertEquals(expected.getSociety(), actual.getSociety());
		TestCase.assertEquals(expected.getSiret(), actual.getSiret());
		TestCase.assertEquals(expected.getSocialReason(), actual.getSocialReason());
		TestCase.assertEquals(expected.getPhone(), actual.getPhone());
		assertAddress(expected.getAddress(), actual.getAddress());
	}

	public static void assertAddress(AddressBean expected, AddressBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getAddress(), actual.getAddress());
			TestCase.assertEquals(expected.getCity(), actual.getCity());
			TestCase.assertEquals(expected.getPostalCode(), actual.getPostalCode());
		}
	}
}