package extmvc.logger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import extmvc.action.Exit;
import extmvc.action.RoleAction;
import extmvc.entities.UserLogin;
import extmvc.service.impl.UserLoginLimiteTest;

public class MyLogger {
	public static Logger roleActionLogger = LoggerFactory.getLogger(RoleAction.class);
	public static Logger userActionLogger = LoggerFactory.getLogger(UserLogin.class);
	public static Logger userLoginLimiteTest = LoggerFactory.getLogger(UserLoginLimiteTest.class);
	public static Logger exit = LoggerFactory.getLogger(Exit.class);
}
