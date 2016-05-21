package tools;

import javax.ws.rs.core.Response;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.error.ErrorBean;
import org.ap.web.entity.error.ErrorDetailsBean;
import org.ap.web.entity.mongo.AddressBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.ContactBean;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.entity.mongo.PersonBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;

import junit.framework.TestCase;

public class AssertHelper {

	/* ERRORS */

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

	/* ENTITIES */

	public static void assertContact(ContactBean expected, ContactBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getAddressChecked(), actual.getAddressChecked());
			TestCase.assertEquals(expected.getEmail(), actual.getEmail());
			TestCase.assertEquals(expected.getEmailChecked(), actual.getEmailChecked());
			TestCase.assertEquals(expected.getPhone(), actual.getPhone());
			TestCase.assertEquals(expected.getPhoneChecked(), actual.getPhoneChecked());
			assertAddress(expected.getAddress(), actual.getAddress());
		}
	}
	public static void assertMissions(MissionBean[] expected, MissionBean[] actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.length, actual.length);
			for (int i = 0 ; i < expected.length ; i++) { assertMission(expected[i], actual[i]); }
		}
	}
	public static void assertMission(MissionBean expected, MissionBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getEndHour(), actual.getEndHour());
			TestCase.assertEquals(expected.getStartHour(), actual.getStartHour());
			TestCase.assertEquals(expected.getDate(), actual.getDate());
			assertContact(expected.getContact(), actual.getContact());
		}
	}
	public static void assertIndisponibilities(IndisponibilityBean[] expected, IndisponibilityBean[] actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.length, actual.length);
			for (int i = 0 ; i < expected.length ; i++) { assertIndisponibility(expected[i], actual[i]); }
		}
	}
	public static void assertIndisponibility(IndisponibilityBean expected, IndisponibilityBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getEndHour(), actual.getEndHour());
			TestCase.assertEquals(expected.getStartHour(), actual.getStartHour());
			TestCase.assertEquals(expected.getDate(), actual.getDate());
		}
	}

	public static void assertPerson(PersonBean expected, PersonBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getCivility(), actual.getCivility());
			TestCase.assertEquals(expected.getFirstName(), actual.getFirstName());
			TestCase.assertEquals(expected.getLastName(), actual.getLastName());
			TestCase.assertEquals(expected.getBirthDate(), actual.getBirthDate());
			TestCase.assertEquals(expected.getBirthPlace(), actual.getBirthPlace());
		}
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
		assertUser(expected.getUser(), actual.getUser());
		assertContact(expected.getContact(), actual.getContact());
		assertPerson(expected.getPerson(), actual.getPerson());
		TestCase.assertEquals(expected.getDiploma(), actual.getDiploma());
	}

	public static void assertService(ServiceBean expected, ServiceBean actual) {
		assertUser(expected.getUser(), actual.getUser());
		assertContact(expected.getContact(), actual.getContact());
		TestCase.assertEquals(expected.getSociety(), actual.getSociety());
		TestCase.assertEquals(expected.getSiret(), actual.getSiret());
		TestCase.assertEquals(expected.getSocialReason(), actual.getSocialReason());
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