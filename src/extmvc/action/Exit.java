package extmvc.action;

import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Exit {

	@RequestMapping(value="/exit")
	public void exit(String username, HttpServletRequest request){
		System.out.println("-------正常退出，清除session和loginUserMap-------");
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		Map<String, Boolean> sessionIds = new LinkedHashMap<>();
		Map<String, Map<String, Boolean>> loginUserMap = (Map<String, Map<String, Boolean>>) session.getServletContext().getAttribute("loginUserMap");
		sessionIds = loginUserMap.get(username);
		sessionIds.remove(sessionId);
		loginUserMap.put(username, sessionIds);
		session.getServletContext().setAttribute("loginUserMap", loginUserMap);
		session.removeAttribute("userLogin");
		//session.invalidate();//调用此方法，将会触发sessionDestroyed监听器，将session销毁
	}
	
	//判断session是否还存在和验证用户是否通过登录
	@RequestMapping(value="/isHasSession",method=RequestMethod.POST)
	@ResponseBody
	public String isHasSession(String username, String userrole, HttpServletRequest request){
		
		//System.out.println("username:" + username + ",userrole:" + userrole);
		//获取session
		HttpSession session = request.getSession();
		//获取sessionid
		String sessionId = session.getId();
		//获取loginUserMap
		Map<String, Map<String, Boolean>> loginUserMap = (Map<String, Map<String, Boolean>>) session.getServletContext().getAttribute("loginUserMap");
		Map<String, Boolean> sessionIds = new LinkedHashMap<>();
		sessionIds = loginUserMap.get(username);
		//如果userrole为空，表示是登录验证
		if(userrole == null){
			//如果此sessionid还在表示正在验证
			if(sessionIds.containsKey(sessionId)){
				boolean b = sessionIds.get(sessionId);
				return "{'success':"+b+"}";
			}else {//如果没有了此sessionid表示被删除了，因此返回-1，但是-1不是false，所以前台也会为真
				return "{'success':-1}";
			}
		}
		//这是userrole不为空，表示是判断用户是否还存在
		if(sessionIds.containsKey(sessionId)){
			return "{'success':true}";
		}
		return "{'success':false}";
	}
	
	@RequestMapping(value="/checkHasNewUser",method=RequestMethod.POST)
	@ResponseBody
	public String checkHasNewUser(String username,HttpServletRequest request){
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		Map<String, Map<String, Boolean>> loginUserMap = (Map<String, Map<String, Boolean>>) session.getServletContext().getAttribute("loginUserMap");
		Map<String, Boolean> sessionIds = loginUserMap.get(username);
		int i = 0;
		for(String key : sessionIds.keySet()){
			i++;
			//判断是否是第一个登录的用户，是才有权限处理后续用户的登录
			if(key.equals(sessionId) && i == 1){
				//查找是否存在false，存在则返回
				for(String key1 : sessionIds.keySet()){
					if(!sessionIds.get(key1)){
						return "{'success':false}";
					}
				}
			}else if(key.equals(sessionId) && i > 1){//如果不是第一个用户，则返回true，不做任何处理
				return "{'success':true}";
			}
		}
		return "{'success':true}";
	}
	
	@RequestMapping(value="/isAllowLogin",method=RequestMethod.POST)
	@ResponseBody
	public String isAllowLogin(String username, boolean isAllow, HttpServletRequest request){
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		Map<String, Map<String, Boolean>> loginUserMap = (Map<String, Map<String, Boolean>>) session.getServletContext().getAttribute("loginUserMap");
		Map<String, Boolean> sessionIds = loginUserMap.get(username);
		for(String key : sessionIds.keySet()){
			//查询到某一次登录为false并且用户允许登录isAllow为true
			if(!sessionIds.get(key)){
				//允许用户登录
				if(isAllow){
					sessionIds.put(key, true);
				}else {//不允许登录
					sessionIds.remove(key);
				}
				loginUserMap.put(username, sessionIds);
				session.getServletContext().setAttribute("loginUserMap", loginUserMap);
				return "{'success':true}";
			}
		}
		return "{'success':true}";
	}
}
