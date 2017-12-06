package extmvc.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

@Service
public class UserLoginLimiteTest {
	//实现多个用户在线登录，第一个用户能够剔除后续用户，list中存放用户的sessionid
	private static Map<String, Map<String, Boolean>> loginUserMap = new HashMap<>();//存储在线用户
	private static Map<String, Object> loginUserIp = new HashMap<>();//保存ip地址，一个sessionId对应一个ip
	private static Map<String, Object> loginTime = new HashMap<>();//后续用户登录的时间
	public String userLoginLimite(String username, HttpServletRequest request){
		//获取客户端的真实地址:如192.168.0.100
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getHeader("WL-Proxy-Client-IP");
	    }
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
	        ip = request.getRemoteAddr();
	    }
	    if(ip.equals("0:0:0:0:0:0:0:1")){
	    	//System.out.println("本地ip:" + ip + "------------------------");
	    }
		
		String sessionId = request.getSession().getId();
		Map<String, Boolean> sessionIds = new LinkedHashMap<>();
		
		//判断是否有此用户名，存在表示已登录
		if(loginUserMap.containsKey(username)){
			sessionIds = loginUserMap.get(username);
			//System.out.println(sessionIds);
			if(sessionIds.containsKey(sessionId)){
				//System.out.println("此次登录还未退出");
				return "success";
			}
			//第二次外地登录，先将其设置为false，等待第一个用户验证
			sessionIds.put(sessionId, false);
			loginUserMap.put(username, sessionIds);
			request.getSession().getServletContext().setAttribute("loginUserMap", loginUserMap);
			loginTime.put(username, new Date());
			request.getSession().getServletContext().setAttribute("loginTime", loginTime);
			loginUserIp.put(sessionId, ip);
			request.getSession().getServletContext().setAttribute("loginUserIp", loginUserIp);
			return "false";
		}
		//以下操作表示用户第一次登录
		//System.out.println("用户第一次登录");
		loginUserIp.put(sessionId, ip);
		request.getSession().getServletContext().setAttribute("loginUserIp", loginUserIp);
		loginTime.put(username, new Date());
		request.getSession().getServletContext().setAttribute("loginTime", loginTime);
		sessionIds.put(sessionId, true);
		loginUserMap.put(username, sessionIds);
		request.getSession().getServletContext().setAttribute("loginUserMap", loginUserMap);
		return "success";
	}
}
