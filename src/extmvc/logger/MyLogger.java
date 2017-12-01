package extmvc.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import extmvc.action.RoleAction;
import extmvc.entities.UserLogin;

public class MyLogger {
	public static Logger roleActionLogger = LoggerFactory.getLogger(RoleAction.class);
	public static Logger userActionLogger = LoggerFactory.getLogger(UserLogin.class);
}
