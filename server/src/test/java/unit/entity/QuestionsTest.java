package unit.entity;

import org.ap.web.entity.constant.EQuestion;
import org.ap.web.entity.constant.EQuestion.Answer;
import org.junit.Test;

import junit.framework.TestCase;

public class QuestionsTest {

	@Test
	public void testV_validQuestions() {
		for(EQuestion q : EQuestion.values()) {
			System.out.println(q.getIndex());
			int ch = 0;
			int ho = 0;
			int co = 0;
			int sh = 0;
			int nu = 0;
			int ad = 0; 
			int di = 0;
			for (Answer a : q.getAnswers()) {
				ch += a.getChildhood();
				ho += a.getHousework();
				co += a.getCompagny();
				sh += a.getShopping();
				nu += a.getNursing();
				ad += a.getAdministrative();
				di += a.getDoityourself();
			}
			TestCase.assertEquals(1, ch);
			TestCase.assertEquals(1, ho);
			TestCase.assertEquals(1, co);
			TestCase.assertEquals(1, sh);
			TestCase.assertEquals(1, nu);
			TestCase.assertEquals(1, ad);
			TestCase.assertEquals(1, di);
		}
	}
	@Test
	public void testV_validTotal() {
		int ch = 0;
		int ho = 0;
		int co = 0;
		int sh = 0;
		int nu = 0;
		int ad = 0; 
		int di = 0;
		for(EQuestion q : EQuestion.values()) {
			for (Answer a : q.getAnswers()) {
				ch += a.getChildhood();
				ho += a.getHousework();
				co += a.getCompagny();
				sh += a.getShopping();
				nu += a.getNursing();
				ad += a.getAdministrative();
				di += a.getDoityourself();
			}
		}
		TestCase.assertEquals(38, ch);
		TestCase.assertEquals(38, ho);
		TestCase.assertEquals(38, co);
		TestCase.assertEquals(38, sh);
		TestCase.assertEquals(38, nu);
		TestCase.assertEquals(38, ad);
		TestCase.assertEquals(38, di);
	}
}
