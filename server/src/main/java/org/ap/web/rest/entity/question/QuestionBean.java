package org.ap.web.rest.entity.question;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class QuestionBean {

	private String question;
	private String[] responses;
	private int answer;
	
	public QuestionBean() {}

	public String getQuestion() { return question; }
	public void setQuestion(String question) { this.question = question; }
	
	public String[] getResponses() { return responses; }
	public void setResponses(String[] responses) { this.responses = responses; }
	
	public int getAnswer() { return answer; }
	public void setAnswer(int answer) { this.answer = answer; }
	
}
