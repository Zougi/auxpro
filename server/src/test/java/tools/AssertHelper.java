package tools;

import java.time.DayOfWeek;

import javax.ws.rs.core.Response;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.error.ErrorBean;
import org.ap.web.entity.error.ErrorDetailsBean;
import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.AddressBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.ContactBean;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.entity.mongo.OneTimeBean;
import org.ap.web.entity.mongo.PersonBean;
import org.ap.web.entity.mongo.RecurenceBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.SkillsBean;
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

	public static void assertAbsences(AbsenceBean[] expected, AbsenceBean[] actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.length, actual.length);
			for (int i = 0 ; i < expected.length ; i++) { assertAbsence(expected[i], actual[i]); }
		}
	}
	public static void assertAbsence(AbsenceBean expected, AbsenceBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getAuxiliaryId(), actual.getAuxiliaryId());
			assertOneTime(expected.getOneTime(), actual.getOneTime());
			assertRecurence(expected.getRecurence(), actual.getRecurence());
		}
	}
	public static void assertAddress(AddressBean expected, AddressBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getAddress(), actual.getAddress());
			TestCase.assertEquals(expected.getCity(), actual.getCity());
			TestCase.assertEquals(expected.getPostalCode(), actual.getPostalCode());
			TestCase.assertEquals(expected.getCountry(), actual.getCountry());
		}
	}
	public static void assertAuxiliary(AuxiliaryBean expected, AuxiliaryBean actual) {
		assertUser(expected.getUser(), actual.getUser());
		assertContact(expected.getContact(), actual.getContact());
		assertPerson(expected.getPerson(), actual.getPerson());
		assertSkills(expected.getSkills(), actual.getSkills());
		TestCase.assertEquals(expected.getDiploma(), actual.getDiploma());
	}
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
	public static void assertCredentials(CredentialsBean expected, CredentialsBean actual) {
		TestCase.assertEquals(expected.getName(), actual.getName());
		TestCase.assertEquals(expected.getEmail(), actual.getEmail());
	}
	public static void assertCustomer(CustomerBean expected, CustomerBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			assertContact(expected.getContact(), actual.getContact());
			assertPerson(expected.getPerson(), actual.getPerson());
			assertSkills(expected.getSkills(), actual.getSkills());
		}
	}
	public static void assertDayOfWeeks(DayOfWeek[] expected, DayOfWeek[] actual) {
		TestCase.assertEquals(expected.length, actual.length);
	}
	public static void assertIntervention(InterventionBean expected, InterventionBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			assertAddress(expected.getAddress(), actual.getAddress());
			assertOneTime(expected.getOneTime(), actual.getOneTime());
			assertRecurence(expected.getRecurence(), actual.getRecurence());
			TestCase.assertEquals(expected.getAuxiliaryId(), actual.getAuxiliaryId());
			TestCase.assertEquals(expected.getServiceId(), actual.getServiceId());
			TestCase.assertEquals(expected.getCustomerId(), actual.getCustomerId());
		}
	}
	public static void assertOffer(OfferBean expected, OfferBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getServiceId(), actual.getServiceId());
			TestCase.assertEquals(expected.getCustomerId(), actual.getCustomerId());
			TestCase.assertEquals(expected.getInterventionId(), actual.getInterventionId());
			TestCase.assertEquals(expected.getAuxiliaryId(), actual.getAuxiliaryId());
			TestCase.assertEquals(expected.getCreationDate(), actual.getCreationDate());
			TestCase.assertEquals(expected.getExpiryDate(), actual.getExpiryDate());
			TestCase.assertEquals(expected.getStatus(), actual.getStatus());
		}
	}
	public static void assertOneTime(OneTimeBean expected, OneTimeBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getDate(), actual.getDate());
			TestCase.assertEquals(expected.getStartTime(), actual.getStartTime());
			TestCase.assertEquals(expected.getEndTime(), actual.getEndTime());
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
			TestCase.assertEquals(expected.getSocialNumber(), actual.getSocialNumber());
			TestCase.assertEquals(expected.getNationality(), actual.getNationality());
			TestCase.assertEquals(expected.getCiNumber(), actual.getCiNumber());
			assertAddress(expected.getBirthPlace(), actual.getBirthPlace());
		}
	}
	public static void assertRecurence(RecurenceBean expected, RecurenceBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getStartDate(), actual.getStartDate());
			TestCase.assertEquals(expected.getEndDate(), actual.getEndDate());
			TestCase.assertEquals(expected.getStartTime(), actual.getStartTime());
			TestCase.assertEquals(expected.getEndTime(), actual.getEndTime());
			TestCase.assertEquals(expected.getPeriod(), actual.getPeriod());
//			assertDayOfWeeks(expected.getDays(), actual.getDays());
		}
	}
	public static void assertService(ServiceBean expected, ServiceBean actual) {
		assertUser(expected.getUser(), actual.getUser());
		assertContact(expected.getContact(), actual.getContact());
		TestCase.assertEquals(expected.getSociety(), actual.getSociety());
		TestCase.assertEquals(expected.getSiret(), actual.getSiret());
		TestCase.assertEquals(expected.getSocialReason(), actual.getSocialReason());
	}
	public static void assertSkills(SkillsBean expected, SkillsBean actual) {
		if (expected == null) {
			TestCase.assertNull(actual);
		} else {
			TestCase.assertEquals(expected.getAdministrative(), actual.getAdministrative());
			TestCase.assertEquals(expected.getChildhood(), actual.getChildhood());
			TestCase.assertEquals(expected.getCompagny(), actual.getCompagny());
			TestCase.assertEquals(expected.getDoityourself(), actual.getDoityourself());
			TestCase.assertEquals(expected.getHousework(), actual.getHousework());
			TestCase.assertEquals(expected.getNursing(), actual.getNursing());
			TestCase.assertEquals(expected.getShopping(), actual.getShopping());
		}
	}
	public static void assertUser(UserBean expected, UserBean actual) {
		assertCredentials(expected, actual);
		TestCase.assertEquals(expected.getActive(), actual.getActive());
		TestCase.assertEquals(expected.getTutoSkipped(), actual.getTutoSkipped());
		TestCase.assertEquals(expected.getType(), actual.getType());
		TestCase.assertEquals(expected.getRegistrationDate(), actual.getRegistrationDate());
	}	
}