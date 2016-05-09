package org.ap.web.rest.security;

import java.security.Principal;

import javax.ws.rs.core.SecurityContext;

import org.ap.web.rest.entity.constant.EUserRole;
import org.ap.web.rest.entity.constant.EUserType;
import org.ap.web.rest.entity.user.UserBean;

public class UserSecurityContext implements SecurityContext, Principal {
	
	/* STATIC */
	
	private static UserBean getGuestBean() {
		UserBean guest = new UserBean();
		guest.setName("guest");
		guest.setType(EUserType.GUEST.getId());
		return guest;
	}
	public static final UserSecurityContext GUEST = new UserSecurityContext(getGuestBean());
	
	/* ATTRIBUTES */
	
	private UserBean _user;
	
	/* CONSTRUCTOR */
	
	public UserSecurityContext(UserBean user) {
		_user = user;
	}
	
	/* METHODS */
	
	// SecurityContext implementation //
	
	@Override
	public String getAuthenticationScheme() {
		return "apSec";
	}
	@Override
	public Principal getUserPrincipal() {
		return this;
	}
	@Override
	public boolean isSecure() {
		return true;
	}
	@Override
	public boolean isUserInRole(String role) {
		EUserRole r = EUserRole.byId(role);
		switch (r) {
		case ADMIN:
			return EUserType.ADMIN.equals(EUserType.byId(_user.getType()));
		case AUTHENTICATED:
			return !EUserType.GUEST.equals(EUserType.byId(_user.getType()));
		default:
			return false;
		}
	}
	
	// Principal Implementation //
	
	@Override
	public String getName() {
		return _user.getName();
	}
}
