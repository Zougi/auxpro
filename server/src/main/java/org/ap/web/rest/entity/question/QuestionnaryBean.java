package org.ap.web.rest.entity.question;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class QuestionnaryBean {

	private QuestionBean[] questions;
	
	public QuestionnaryBean() {}

	public QuestionBean[] getQuestions() { return questions; }
	public void setQuestions(QuestionBean[] questions) { this.questions = questions; }
		
}
