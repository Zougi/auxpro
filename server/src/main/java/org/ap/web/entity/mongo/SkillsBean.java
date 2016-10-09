package org.ap.web.entity.mongo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)
public class SkillsBean {

	private int housework;
	private int nursing;
	private int childhood;
	private int shopping;
	private int compagny;
	private int administrative;
	private int doityourself;
	
	/* CONSTRUCTORS */
	
	public SkillsBean() {}
	
	/* GETTERS & SETTERS */
	
	public int getHousework() { return housework; }
	public void setHousework(int housework) { this.housework = housework; }
	
	public int getNursing() { return nursing; }
	public void setNursing(int nursing) { this.nursing = nursing; }
	
	public int getChildhood() { return childhood; }
	public void setChildhood(int childhood) { this.childhood = childhood; }
	
	public int getShopping() { return shopping; }
	public void setShopping(int shopping) { this.shopping = shopping; }	
	
	public int getCompagny() { return compagny; }
	public void setCompagny(int compagny) { this.compagny = compagny; }
	
	public int getAdministrative() { return administrative; }
	public void setAdministrative(int administrative) { this.administrative = administrative; }
	
	public int getDoityourself() { return doityourself; }
	public void setDoityourself(int doityourself) { this.doityourself = doityourself; }
	
	/* ADDITIONNAL METHODS */
	
	public boolean isCompleted() {
		return (
			housework != 0 ||
			nursing != 0 ||
			childhood != 0 ||
			shopping != 0 ||
			compagny != 0 ||
			administrative != 0 ||
			doityourself != 0
		);
	}
	public void setCompleted() {}
}
