package extmvc.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
//Tansactional:编程式事务注解
@Service
//@Transactional
public class UserLoginLimite {
	//保存登录信息
	private static Map<String, Object> loginUserMap = new HashMap<>();//存储在线用户
	private static Map<String, Object> loginOutTime = new HashMap<>();//存储剔除用户时间
	
	public String userLoginLimite(String username, HttpServletRequest request){
		
		/*保存登录信息*/
		/*1:获取当地登录的sessionid*/
		String sessionId = request.getSession().getId();
		/*2:判断是否已经在其他地方登录
		 * 判断条件：1）通过key查找是否有username的存在
		 * 		   2）通过sessionid判断本地sessionid是否存在
		 * */
		for(String key : loginUserMap.keySet()){
			//用户在另一处已经登录
			if(key.equals(username) && !loginUserMap.containsValue(sessionId)){
				System.out.println("用户已经在别处登录，在此将其剔除，剔除时间：" + new Date());
				
				loginOutTime.put(username, new Date());
				
				//剔除用户
				loginUserMap.remove(username);
			}
		}
		
		//将登录的用户名（第一次或在外地登录）保存在map中
		loginUserMap.put(username, sessionId);
		request.getSession().getServletContext().setAttribute("loginUserMap", loginUserMap);
		request.getSession().getServletContext().setAttribute("loginOutTime", loginOutTime);
		System.out.println("loginUserMap第一次保存信息：" + loginUserMap);
		return "success";
	}
}
