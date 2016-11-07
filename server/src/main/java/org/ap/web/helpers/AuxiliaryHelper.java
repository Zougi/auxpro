package org.ap.web.helpers;

import org.ap.web.entity.constant.EQuestion;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.AuxiliaryQuestionaryBean;

public class AuxiliaryHelper {

	public static void computeSkills(AuxiliaryBean auxiliary, AuxiliaryQuestionaryBean questionary) {
		int ch = 0;
		int ho = 0;
		int co = 0;
		int sh = 0;
		int nu = 0;
		int ad = 0; 
		int di = 0;
		for (EQuestion q : EQuestion.values()) {
			int answer = questionary.getAnswers()[q.getIndex()];
			ch += q.getAnswers()[answer].getChildhood();
			ho += q.getAnswers()[answer].getHousework();
			co += q.getAnswers()[answer].getCompagny();
			sh += q.getAnswers()[answer].getShopping();
			nu += q.getAnswers()[answer].getNursing();
			ad += q.getAnswers()[answer].getAdministrative();
			di += q.getAnswers()[answer].getDoityourself();
		}
		auxiliary.setChildhood(Math.round(ch * 5 / 38));
		auxiliary.setHousework(Math.round(ho * 5 / 38));
		auxiliary.setCompagny(Math.round(co * 5 / 38));
		auxiliary.setShopping(Math.round(sh * 5 / 38));
		auxiliary.setNursing(Math.round(nu * 5 / 38));
		auxiliary.setAdministrative(Math.round(ad * 5 / 38));
		auxiliary.setDoityourself(Math.round(di * 5 / 38));
		auxiliary.setAnswers(questionary.getAnswers());;
	}
}
