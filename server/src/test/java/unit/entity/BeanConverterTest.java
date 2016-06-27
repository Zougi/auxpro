package unit.entity;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.constant.EUserType;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.UserBean;
import org.bson.Document;
import org.junit.Test;

import tools.AssertHelper;
import tools.TestData;

public class BeanConverterTest {

	/* TEST CASES */
	
	@Test
	public void testV_CredentialsBean2String() throws Exception {
		CredentialsBean expected = TestData.next(new CredentialsBean());
		String s = BeanConverter.beanToString(expected);
		CredentialsBean actual = BeanConverter.stringToBean(s, CredentialsBean.class);
		AssertHelper.assertCredentials(expected, actual);
	}
	
	
	@Test
	public void testV_UserBean2String() throws Exception {
		UserBean expected = TestData.next(new UserBean(), EUserType.AUXILIARY.getId(), "dummy");
		String s = BeanConverter.beanToString(expected);
		UserBean actual = BeanConverter.stringToBean(s, UserBean.class);
		AssertHelper.assertUser(expected, actual);
	}
	@Test
	public void testV_UserBean2Mongo() throws Exception {
		UserBean expected = TestData.next(new UserBean(), EUserType.AUXILIARY.getId(), "dummy");
		Document doc = BeanConverter.convertToMongo(expected);
		UserBean actual = BeanConverter.convertToBean(doc, UserBean.class);
		AssertHelper.assertUser(expected, actual);
	}
}
