package unit.entity;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.constant.EUserType;
import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.entity.mongo.UserBean;
import org.bson.Document;
import org.junit.Test;

import tools.AssertHelper;
import tools.TestDataGenerator;

public class BeanConverterTest {

	/* TEST CASES */
	
	@Test
	public void testV_CredentialsBean2String() throws Exception {
		UserCredentialsBean expected = TestDataGenerator.next(new UserCredentialsBean());
		String s = BeanConverter.beanToString(expected);
		UserCredentialsBean actual = BeanConverter.stringToBean(s, UserCredentialsBean.class);
		AssertHelper.assertCredentials(expected, actual);
	}
	
	
	@Test
	public void testV_UserBean2String() throws Exception {
		UserBean expected = TestDataGenerator.next(new UserBean(), EUserType.AUX.getId(), "dummy");
		String s = BeanConverter.beanToString(expected);
		UserBean actual = BeanConverter.stringToBean(s, UserBean.class);
		AssertHelper.assertUser(expected, actual);
	}
	@Test
	public void testV_UserBean2Mongo() throws Exception {
		UserBean expected = TestDataGenerator.next(new UserBean(), EUserType.AUX.getId(), "dummy");
		Document doc = BeanConverter.convertToMongo(expected);
		UserBean actual = BeanConverter.convertToBean(doc, UserBean.class);
		AssertHelper.assertUser(expected, actual);
	}
}
