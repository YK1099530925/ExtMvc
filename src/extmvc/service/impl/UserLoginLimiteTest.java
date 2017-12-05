package extmvc.service.impl;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

@Service
public class UserLoginLimiteTest {
	//实现多个用户在线登录，第一个用户能够剔除后续用户，list中存放用户的sessionid
	private static Map<String, Map<String, Boolean>> loginUserMap = new HashMap<>();//存储在线用户
	public String userLoginLimite(String username, HttpServletRequest request){
		
		String sessionId = request.getSession().getId();
		Map<String, Boolean> sessionIds = new LinkedHashMap<>();
		
		//判断是否有此用户名，存在表示已登录
		if(loginUserMap.containsKey(username)){
			sessionIds = loginUserMap.get(username);
			System.out.println(sessionIds);
			if(sessionIds.containsKey(sessionId)){
				System.out.println("此次登录还未退出");
				return "success";
			}
			//第二次外地登录，先将其设置为false，等待第一个用户验证
			sessionIds.put(sessionId, false);
			loginUserMap.put(username, sessionIds);
			request.getSession().getServletContext().setAttribute("loginUserMap", loginUserMap);
			return "false";
		}
		//以下操作表示用户第一次登录
		System.out.println("用户第一次登录");
		sessionIds.put(sessionId, true);
		loginUserMap.put(username, sessionIds);
		request.getSession().getServletContext().setAttribute("loginUserMap", loginUserMap);
		return "success";
	}
}
