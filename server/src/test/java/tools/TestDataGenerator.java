package tools;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.constant.EPersonSex;
import org.ap.web.entity.constant.ERecurencePeriod;
import org.ap.web.entity.constant.ESadType;
import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.entity.mongo.AddressBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.ContactBean;
import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.GeozoneBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.entity.mongo.OneTimeBean;
import org.ap.web.entity.mongo.PersonBean;
import org.ap.web.entity.mongo.RecurenceBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.SkillsBean;
import org.ap.web.entity.mongo.UserBean;

public class TestDataGenerator {

	public static int ABSENCE_ID = 0;
	public static int ADDRESS_ID = 0;
	public static int AUXILIARY_ID = 0;
	public static int CONTACT_ID = 0;
	public static int CUSTOMER_ID = 0;
	public static int INTERVENTION_ID = 0;
	public static int OFFER_ID = 0;
	public static int ONETIME_ID = 0;
	public static int PERSON_ID = 0;
	public static int QUESTIONARY_ID = 7;
	public static int RECURENCE_ID = 0;
	public static int SERVICE_ID = 0;
	public static int SKILL_ID = 0;
	public static int USER_ID = 0;
	public static int GEOZONE_ID = 0;

	public static UserCredentialsBean getNextCredentials() {
		return next(new UserCredentialsBean());
	}
	
	public static IndisponibilityBean next(IndisponibilityBean bean) {
		bean.setId(StringConverter.stringToHex(String.valueOf(ABSENCE_ID++)));
		bean.setAuxiliaryId(StringConverter.stringToHex(String.valueOf(AUXILIARY_ID)));
		if (ABSENCE_ID % 2 == 0) {
			bean.setRecurence(next(new RecurenceBean()));
		} else {
			bean.setOneTime(next(new OneTimeBean()));
		}
		return bean;
	}
	public static AuxiliaryBean next(AuxiliaryBean bean) {
		bean.setId(StringConverter.stringToHex(String.valueOf(AUXILIARY_ID++)));
		bean.setEmail("contact" + AUXILIARY_ID++ + "@contact.com");
		bean.setAddress(AUXILIARY_ID + " nouvelle rue");
		bean.setCity("Paris");
		bean.setCountry("France");
		bean.setLattitude("0");
		bean.setLongitude("0");
		bean.setPostalCode(75000);
		bean.setAddressChecked(true);
		bean.setEmailChecked(true);
		bean.setPhone("0102030405");
		bean.setPhoneChecked(false);
		bean.setCiNumber("CI" + AUXILIARY_ID++);
		bean.setBirthDate(LocalDate.now());
		bean.setBirthCity("BirthCity" + AUXILIARY_ID);
		bean.setBirthCountry("BirthCountry" + AUXILIARY_ID);
		bean.setCivility(EPersonSex.M.getId());
		bean.setFirstName("Prenom " + AUXILIARY_ID);
		bean.setLastName("Nom " + AUXILIARY_ID);
		bean.setNationality("Francaise");
		bean.setSocialNumber("SecSociale " + AUXILIARY_ID);
		bean.setAdministrative(1 + AUXILIARY_ID);
		bean.setChildhood(2 + AUXILIARY_ID);
		bean.setCompagny(3 + AUXILIARY_ID);
		bean.setDoityourself(4 + AUXILIARY_ID);
		bean.setHousework(5 + AUXILIARY_ID);
		bean.setNursing(6 + AUXILIARY_ID);
		bean.setShopping(7 + AUXILIARY_ID);
		bean.setEmail(AUXILIARY_ID + "@" + AUXILIARY_ID + ".com");
		bean.setTutoSkipped(true);
		return bean;
	}
	public static AddressBean next(AddressBean bean) {
		bean.setAddress(ADDRESS_ID++ + " nouvelle rue");
		bean.setCity("Paris");
		bean.setCountry("France");
		bean.setLattitude("0");
		bean.setLongitude("0");
		bean.setPostalCode(75000);
		return bean;
	}
	public static UserCredentialsBean next(UserCredentialsBean bean) {
		String name = "user" + USER_ID++;
		bean.setName(name + "@" + name + ".com");
		bean.setPassword(name);
		return bean;
	}
	public static ContactBean next(ContactBean bean) {
		bean.setAddress(next(new AddressBean()));
		bean.setAddressChecked(true);
		bean.setEmail("contact" + CONTACT_ID++ + "@contact.com");
		bean.setEmailChecked(true);
		bean.setPhone("0102030405");
		bean.setPhoneChecked(false);
		return bean;
	}
	public static CustomerBean next(CustomerBean bean) {
		bean.setId(StringConverter.stringToHex(String.valueOf(CUSTOMER_ID++)));
		bean.setServiceId(String.valueOf(CUSTOMER_ID));
		bean.setBirthDate(LocalDate.now());
		bean.setCivility(EPersonSex.M.getId());
		bean.setFirstName("Prenom " + CUSTOMER_ID);
		bean.setLastName("Nom " + CUSTOMER_ID);
		bean.setNationality("Francaise");
		bean.setEmail("contact" + CUSTOMER_ID++ + "@contact.com");
		bean.setPhone("0102030405");
		bean.setAddress(CUSTOMER_ID + " nouvelle rue");
		bean.setCity("Paris");
		bean.setCountry("France");
		bean.setLattitude("0");
		bean.setLongitude("0");
		bean.setPostalCode(75000);
		bean.setAdministrative(1 + CUSTOMER_ID);
		bean.setChildhood(2 + CUSTOMER_ID);
		bean.setCompagny(3 + CUSTOMER_ID);
		bean.setDoityourself(4 + CUSTOMER_ID);
		bean.setHousework(5 + CUSTOMER_ID);
		bean.setNursing(6 + CUSTOMER_ID);
		bean.setShopping(7 + CUSTOMER_ID);
		return bean;
	}
	public static InterventionBean next(InterventionBean bean) {
		bean.setId(StringConverter.stringToHex(String.valueOf(INTERVENTION_ID++)));
//		bean.setAddress(INTERVENTION_ID + " nouvelle rue");
//		bean.setCity("Paris");
//		bean.setCountry("France");
//		bean.setLattitude("0");
//		bean.setLongitude("0");
//		bean.setPostalCode(75000);
		bean.setAuxiliaryId(StringConverter.stringToHex(String.valueOf(AUXILIARY_ID)));
		bean.setCustomerId(StringConverter.stringToHex(String.valueOf(CUSTOMER_ID)));
		bean.setServiceId(StringConverter.stringToHex(String.valueOf(SERVICE_ID)));
		if (INTERVENTION_ID % 2 == 0) {
			bean.setRecurence(next(new RecurenceBean()));
		} else {
			bean.setOneTime(next(new OneTimeBean()));
		}
		return bean;
	}
	public static OneTimeBean next(OneTimeBean bean) {
		bean.setDate(LocalDate.now().plusDays(ONETIME_ID++));
		bean.setStartTime(LocalTime.of(2, 00));
		bean.setEndTime(LocalTime.of(4, 30));
		return bean;
	}
	public static OfferBean next(OfferBean bean) {
		bean.setAuxiliaryId(StringConverter.stringToHex(String.valueOf(AUXILIARY_ID)));
		bean.setInterventionId(StringConverter.stringToHex(String.valueOf(INTERVENTION_ID)));
		bean.setCreationDate(LocalDate.now().plusDays(ONETIME_ID++));
		bean.setExpiryDate(LocalDate.now().plusDays(ONETIME_ID + 2));
		bean.setStatus("PENDING");
		return bean;
	}
	public static PersonBean next(PersonBean bean) {
		bean.setCiNumber("CI" + PERSON_ID++);
		bean.setBirthDate(LocalDate.now());
		bean.setBirthCity("BirthCity" + PERSON_ID);
		bean.setBirthCountry("BirthCountry" + PERSON_ID);
		bean.setCivility(EPersonSex.M.getId());
		bean.setFirstName("Prenom " + PERSON_ID);
		bean.setLastName("Nom " + PERSON_ID);
		bean.setNationality("Francaise");
		bean.setSocialNumber("SecSociale " + PERSON_ID);
		return bean;
	}
	public static RecurenceBean next(RecurenceBean bean) {
		bean.setStartDate(LocalDate.now().plusDays(RECURENCE_ID));
		bean.setEndDate(LocalDate.now().plusDays(RECURENCE_ID++ + 60));
		bean.setStartTime(LocalTime.of(2, 00));
		bean.setEndTime(LocalTime.of(4, 30));
		bean.setPeriod(ERecurencePeriod.P1W.getId());
		bean.setDays(new DayOfWeek[] { DayOfWeek.MONDAY, DayOfWeek.FRIDAY});
		return bean;
	}
	public static ServiceBean next(ServiceBean bean) {
		bean.setId(StringConverter.stringToHex(String.valueOf(SERVICE_ID++)));
		bean.setAddress(SERVICE_ID + " nouvelle rue");
		bean.setCity("Paris");
		bean.setCountry("France");
		bean.setLattitude("0");
		bean.setLongitude("0");
		bean.setPostalCode(75000);
		bean.setAddressChecked(true);
		bean.setEmail("contact" + SERVICE_ID + "@contact.com");
		bean.setEmailChecked(true);
		bean.setPhone("0102030405");
		bean.setPhoneChecked(false);
		bean.setSiret("Siret " + SERVICE_ID);
		bean.setFunction(ESadType.MAND.getId());
		bean.setSocialReason("Societe " + SERVICE_ID);
		return bean;
	}
	public static SkillsBean next(SkillsBean bean) {
		bean.setAdministrative(1 + SKILL_ID++);
		bean.setChildhood(2 + SKILL_ID);
		bean.setCompagny(3 + SKILL_ID);
		bean.setDoityourself(4 + SKILL_ID);
		bean.setHousework(5 + SKILL_ID);
		bean.setNursing(6 + SKILL_ID);
		bean.setShopping(7 + SKILL_ID);
		return bean;
	}
	public static UserBean next(UserBean bean, String type, String id) {
		bean.setProfileActive(true);
		bean.setRegistrationDate(LocalDateTime.now());
		bean.setType(type);
		bean.setId(id);
		return bean;
	}
	public static GeozoneBean next(GeozoneBean bean) {
		bean.setRadius("500");
		bean.setLattitude("0");
		bean.setLongitude("0");
		bean.setPostalCode(75000);
		return bean;
	}
}
