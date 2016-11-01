package org.ap.web.entity.constant;

public enum EQuestion {

	/* MEMBERS */
	
	// enfance / maison / dame / courses / nursing / admin / brico
	// new Answer(0, 0, 0, 0, 0, 0, 0)
	Q1 (new Answer[] {
			new Answer(0, 1, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 1, 0, 0),
			new Answer(0, 0, 1, 0, 0, 0, 0),
			new Answer(0, 0, 0, 1, 0, 0, 0),
			new Answer(1, 0, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 0),
			new Answer(0, 0, 0, 0, 0, 0, 1)
	}),
	Q2 (new Answer[] {
			new Answer(0, 1, 0, 0, 0, 0, 1),
			new Answer(1, 0, 0, 1, 1, 0, 0),
			new Answer(0, 0, 1, 0, 0, 1, 0)
	}),
	Q3 (new Answer[] {
			new Answer(0, 1, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 1, 0, 0),
			new Answer(0, 0, 1, 0, 0, 0, 0),
			new Answer(0, 0, 0, 1, 0, 0, 0),
			new Answer(1, 0, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 0),
			new Answer(0, 0, 0, 0, 0, 0, 1)
	}),
	Q4 (new Answer[] {
			new Answer(1, 0, 1, 0, 1, 1, 0),
			new Answer(0, 1, 0, 1, 0, 0, 1)
	}),
	Q5 (new Answer[] {
			new Answer(0, 1, 0, 1, 0, 0, 1),
			new Answer(1, 0, 0, 0, 1, 0, 0),
			new Answer(0, 0, 1, 0, 0, 1, 0)
	}),
	Q6 (new Answer[] {
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(0, 1, 0, 0, 1, 0, 0),
			new Answer(1, 0, 1, 0, 0, 1, 0),
			new Answer(0, 0, 0, 1, 0, 0, 1)
	}),
	Q7 (new Answer[] {
			new Answer(0, 0, 0, 0, 1, 0, 1),
			new Answer(1, 1, 1, 1, 0, 1, 0)
	}),
	Q8 (new Answer[] {
			new Answer(1, 0, 1, 1, 1, 1, 0),
			new Answer(0, 1, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 0, 1)
	}),
	Q9 (new Answer[] {
			new Answer(1, 1, 0, 1, 1, 0, 0),
			new Answer(0, 0, 1, 0, 0, 1, 0),
			new Answer(0, 0, 0, 0, 0, 0, 1)
	}),
	Q10(new Answer[] {
			new Answer(1, 1, 0, 1, 0, 0, 0),
			new Answer(0, 0, 0, 0, 1, 0, 1),
			new Answer(0, 0, 1, 0, 0, 1, 0)
	}),
	Q11(new Answer[] {
			new Answer(0, 0, 0, 0, 1, 0, 0),
			new Answer(1, 1, 1, 1, 0, 1, 1)
	}),
	Q12(new Answer[] {
			new Answer(1, 0, 1, 1, 1, 0, 1),
			new Answer(0, 1, 0, 0, 0, 1, 0)
	}),
	Q13(new Answer[] {
			new Answer(1, 1, 0, 1, 0, 1, 1),
			new Answer(0, 0, 1, 0, 1, 0, 0)
	}),
	Q14(new Answer[] {
			new Answer(1, 1, 0, 1, 0, 1, 1),
			new Answer(0, 0, 1, 0, 1, 0, 0)
	}),
	Q15(new Answer[] {
			new Answer(1, 0, 0, 0, 1, 0, 1),
			new Answer(0, 1, 1, 1, 0, 1, 0)
	}),
	Q16(new Answer[] {
			new Answer(0, 0, 0, 1, 0, 0, 0),
			new Answer(1, 1, 1, 0, 1, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 1)
	}),	
	Q17(new Answer[] {
			new Answer(1, 0, 0, 1, 0, 0, 0),
			new Answer(0, 1, 0, 0, 1, 1, 0),
			new Answer(0, 0, 1, 0, 0, 0, 1)
	}),	
	Q18(new Answer[] {
			new Answer(1, 0, 0, 1, 1, 0, 1),
			new Answer(0, 1, 1, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 0),
			new Answer(0, 0, 0, 0, 0, 0, 0)
	}),
	Q19(new Answer[] {
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(1, 1, 1, 1, 1, 1, 1)
	}),
	Q20(new Answer[] {
			new Answer(1, 0, 1, 0, 1, 0, 1),
			new Answer(0, 1, 0, 1, 0, 1, 0)
	}),
	Q21(new Answer[] {
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(1, 1, 1, 1, 1, 0, 1),
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 0)
	}),
	Q22(new Answer[] {
			new Answer(1, 0, 1, 0, 1, 0, 0),
			new Answer(0, 1, 0, 1, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 1)
	}),
	Q23(new Answer[] {
			new Answer(0, 0, 0, 1, 1, 0, 1),
			new Answer(1, 1, 1, 0, 0, 1, 0),
			new Answer(0, 0, 0, 0, 0, 0, 0)
	}),
	Q24(new Answer[] {
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(1, 1, 0, 1, 1, 0, 0),
			new Answer(0, 0, 1, 0, 0, 1, 1)
	}),
	Q25(new Answer[] {
			new Answer(0, 1, 0, 0, 1, 0, 0),
			new Answer(0, 0, 1, 1, 0, 1, 0),
			new Answer(1, 0, 0, 0, 0, 0, 1)
	}),
	Q26(new Answer[] {
			new Answer(1, 1, 1, 1, 0, 1, 0),
			new Answer(0, 0, 0, 0, 1, 0, 1)
	}),
	Q27(new Answer[] {
			new Answer(1, 0, 0, 0, 1, 1, 0),
			new Answer(0, 1, 1, 1, 0, 0, 1),
			new Answer(0, 0, 0, 0, 0, 0, 0)
	}),
	Q28(new Answer[] {
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(1, 1, 1, 1, 1, 1, 1)
	}),
	Q29(new Answer[] {
			new Answer(0, 0, 1, 0, 0, 1, 0),
			new Answer(1, 1, 0, 1, 1, 0, 1)
	}),
	Q30(new Answer[] {
			new Answer(1, 1, 1, 1, 1, 0, 1),
			new Answer(0, 0, 0, 0, 0, 1, 0)
	}),
	Q31(new Answer[] {
			new Answer(0, 0, 0, 0, 0, 1, 0),
			new Answer(1, 1, 1, 1, 1, 0, 1)
	}),
	Q32(new Answer[] {
			new Answer(0, 0, 0, 0, 1, 1, 0),
			new Answer(1, 1, 1, 1, 0, 0, 1)
	}),
	Q33(new Answer[] {
			new Answer(0, 0, 0, 0, 0, 0, 1),
			new Answer(1, 1, 1, 1, 1, 1, 0)
	}),
	Q34(new Answer[] {
			new Answer(1, 1, 1, 1, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 0),
			new Answer(0, 0, 0, 0, 1, 0, 1)
	}),
	Q35(new Answer[] {
			new Answer(0, 1, 1, 1, 0, 1, 0),
			new Answer(1, 0, 0, 0, 1, 0, 1)
	}),
	Q36(new Answer[] {
			new Answer(1, 1, 1, 1, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 1, 0),
			new Answer(0, 0, 0, 0, 1, 0, 1)
	}),
	Q37(new Answer[] {
			new Answer(1, 1, 1, 1, 1, 1, 0),
			new Answer(0, 0, 0, 0, 0, 0, 0),
			new Answer(0, 0, 0, 0, 0, 0, 1),
			new Answer(0, 0, 0, 0, 0, 0, 0)
	}),
	Q38(new Answer[] {
			new Answer(1, 0, 1, 0, 0, 1, 0),
			new Answer(0, 1, 0, 1, 1, 0, 1)
	}),
	;
	
	/* ATTRIBUTES */
	
	private Answer[] answers;
	
	/* CONSTRUCTORS */
	
	private EQuestion(Answer[] answers) {
		this.setAnswers(answers);
	}

	/* METHODS */
	
	public int getIndex() { return new Integer(name().replace("Q", "")) - 1; }
	
	public Answer[] getAnswers() { return answers; }
	public void setAnswers(Answer[] answers) { this.answers = answers; }



	public static class Answer {
		
		private int childhood;
		private int housework;
		private int compagny;
		private int shopping;
		private int nursing;
		private int administrative;
		private int doityourself;
		
		/* CONSTRUCTORS */
		
		public Answer(int childhood, int housework, int compagny, int shopping, int nursing, int administrative, int doityourself) {
			this.setChildhood(childhood);
			this.setHousework(housework);
			this.setCompagny(compagny);
			this.setShopping(shopping);
			this.setNursing(nursing);
			this.setAdministrative(administrative);
			this.setDoityourself(doityourself);
		}

		/* METHODS */
		
		public int getChildhood() { return childhood; }
		public void setChildhood(int childhood) { this.childhood = childhood; }

		public int getHousework() { return housework; }
		public void setHousework(int housework) { this.housework = housework; }

		public int getCompagny() { return compagny; }
		public void setCompagny(int compagny) { this.compagny = compagny; }

		public int getShopping() { return shopping; }
		public void setShopping(int shopping) { this.shopping = shopping; }

		public int getNursing() { return nursing; }
		public void setNursing(int nursing) { this.nursing = nursing; }

		public int getAdministrative() { return administrative; }
		public void setAdministrative(int administrative) { this.administrative = administrative; }

		public int getDoityourself() { return doityourself; }
		public void setDoityourself(int doityourself) { this.doityourself = doityourself; }	
	}
}
