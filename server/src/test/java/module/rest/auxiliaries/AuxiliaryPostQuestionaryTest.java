package module.rest.auxiliaries;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.QuestionaryBean;
import org.ap.web.entity.mongo.SkillsBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class AuxiliaryPostQuestionaryTest extends RestTestBase {

	public AuxiliaryPostQuestionaryTest() {
		super(AuxiliariesServlet.PATH);
	}
	
	/* TEST DATA */
	
	public String getUrlBase() {
		return "/" + auxiliary1.getId() + "/questionary";
	}
	/* TEST CASES */
	
	/* Negative Testing */

	
	/* Positive Testing */
	
	@Test
	public void testV_getResponse() throws Exception {
		String response = prepare(getUrlBase(), auxiliary1.getUser()).post(write(TestData.next(new QuestionaryBean())), String.class);
		System.out.println(response);
		TestCase.assertNotNull(response);		
	}
	@Test
	public void testV_checkSkills() throws Exception {
		SkillsBean skills = prepare(getUrlBase(), auxiliary1.getUser()).post(write(TestData.next(new QuestionaryBean())), SkillsBean.class);
		AuxiliaryBean auxiliary = prepare("/" + auxiliary1.getId(), auxiliary1.getUser()).get(AuxiliaryBean.class);
		AssertHelper.assertSkills(skills, auxiliary.getSkills());
	}
}
