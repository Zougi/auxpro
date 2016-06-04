package unit.entity;

import java.util.Date;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.constant.EUserType;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.bson.Document;
import org.junit.Test;

import tools.AssertHelper;
import tools.entity.DateBean;

public class BeanConverterTest {

	/* TEST CASES */
	
	@Test
	public void test_checkDate() throws Exception {
		DateBean d = new DateBean();
		d.setDate(new Date(Long.parseLong("61288182000000")));
		Document doc = BeanConverter.convertToMongo(d);
		BeanConverter.convertToBean(doc, DateBean.class);
	}
	@Test
	public void test_checkUserConversion() throws APException {
		UserBean user = new UserBean();
		user.setActive(true);
		user.setEmail("email");
		user.setName("name");
		user.setPassword("password");
		user.setRegistrationDate(new Date());
		user.setTutoSkipped(false);
		user.setType(EUserType.ADMIN.getId());
		Document doc = BeanConverter.convertToMongo(user);
		UserBean bean = BeanConverter.convertToBean(doc, UserBean.class);
		AssertHelper.assertUser(user, bean);
	}
	
	@Test
	public void test_checkStringConversion() throws APException {
		String test = "{\"person\":{\"civility\":\"Mr\",\"firstName\":\"Premier\",\"lastName\":\"Auxiliaire az\",\"birthDate\":315705600000,\"birthPlace\":\"Paris\"},\"contact\":{\"email\":\"user1@user1.fr\",\"emailChecked\":true,\"phone\":\"0101010101\",\"phoneChecked\":true,\"address\":{\"address\":\"1ruedupremierutilisateur\",\"postalCode\":75001,\"city\":\"Paris\"},\"addressChecked\":false},\"user\":{\"name\":\"a\",\"email\":\"a\",\"id\":null,\"type\":\"aux\",\"active\":true,\"tutoSkipped\":true,\"registrationDate\":1465948800000}}";
		AuxiliaryBean aux = BeanConverter.stringToBean(test, AuxiliaryBean.class);
		System.out.println(BeanConverter.beanToString(aux));
	}
	
}
