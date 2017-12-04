package extmvc.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

@Service
public class UserLoginLimiteTest {
	//实现多个用户在线登录，第一个用户能够剔除后续用户，list中存放用户的sessionid
	private static Map<String, List<String>> loginUserMap = new HashMap<>();//存储在线用户
	
	public String userLoginLimite(String username, HttpServletRequest request){
		
		String sessionId = request.getSession().getId();
		List<String> sessionIds = new ArrayList<>();
		
		//判断是否有此用户名，存在表示已登录
		if(loginUserMap.containsKey(username)){
			sessionIds = loginUserMap.get(username);
			System.out.println(sessionIds);
			if(sessionIds.contains(sessionId)){
				System.out.println("此次登录还未退出");
				return "success";
			}
		}
		sessionIds.add(sessionId);
		loginUserMap.put(username, sessionIds);
		request.getSession().getServletContext().setAttribute("loginUserMap", loginUserMap);
		return "success";
	}
}
