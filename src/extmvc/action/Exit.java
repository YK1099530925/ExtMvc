package extmvc.action;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import extmvc.logger.MyLogger;

@Controller
public class Exit {

	@RequestMapping(value="/exit")
	public void exit(String username, HttpServletRequest request){
		//System.out.println("-------正常退出，清除session和loginUserMap-------");
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		Map<String, Boolean> sessionIds = new LinkedHashMap<>();
		Map<String, Map<String, Boolean>> loginUserMap = (Map<String, Map<String, Boolean>>) session.getServletContext().getAttribute("loginUserMap");
		sessionIds = loginUserMap.get(username);
		sessionIds.remove(sessionId);
		//判断是否只剩最后一个用户
		if(sessionIds.size() == 0){
			loginUserMap.remove(username);
		}else {
			loginUserMap.put(username, sessionIds);
		}
		session.getServletContext().setAttribute("loginUserMap", loginUserMap);
		session.removeAttribute("userLogin");
		System.out.println("------用户退出-----");
		MyLogger.exit.info("用户退出     --   用户名：" + username + "，退出时间：" + new Date());
		//session.invalidate();//调用此方法，将会触发sessionDestroyed监听器，将session销毁
	}
	
	//判断session是否还存在和验证用户是否通过登录
	@RequestMapping(value="/isHasSession",method=RequestMethod.POST)
	@ResponseBody
	public String isHasSession(String username, String userrole, HttpServletRequest request){
		System.out.println("username:"+username+",userrole:"+userrole);
		//首先判断用户是否为空，为空表示未登录
		if(username.equals("") && userrole.equals("")){
			System.out.println("issession返回-1");
			return "{'success':-1}";
		}
		//获取session
		HttpSession session = request.getSession();
		//获取sessionid
		String sessionId = session.getId();
		//获取loginUserMap
		Map<String, Map<String, Boolean>> loginUserMap = (Map<String, Map<String, Boolean>>) session.getServletContext().getAttribute("loginUserMap");
		if(loginUserMap == null || loginUserMap.get(username) == null){
			return "{'success':-1}";
		}
		Map<String, Boolean> sessionIds = new LinkedHashMap<>();
		sessionIds = loginUserMap.get(username);
		//如果userrole为空，表示是登录验证
		if(userrole == null || userrole.equals("")){
			//如果此sessionid还在表示正在验证
			if(sessionIds.containsKey(sessionId)){
				boolean b = sessionIds.get(sessionId);
				return "{'success':"+b+"}";
			}else {//如果没有了此sessionid表示被删除了，因此返回-2，但是-2不是false，所以前台也会为真
				return "{'success':-2}";
			}
		}
		//这是userrole不为空，表示是判断用户是否还存在
		if(sessionIds.containsKey(sessionId)){/*存在问题：当用户退出之后，点击网页返回按钮，此处报错java.lang.NullPointerException*/
			return "{'success':true}";
		}
		return "{'success':false}";
	}
	
	@RequestMapping(value="/checkHasNewUser",method=RequestMethod.POST)
	@ResponseBody
	public String checkHasNewUser(String username,HttpServletRequest request){
		System.out.println("username:"+username);
		//首先判断用户是否为空，为空表示未登录
		if(username.equals("")){
			System.out.println("check -1");
			return "{'success':-1}";
		}
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		Map<String, Map<String, Boolean>> loginUserMap = (Map<String, Map<String, Boolean>>) session.getServletContext().getAttribute("loginUserMap");
		if(loginUserMap == null || loginUserMap.get(username) == null){
			return "{'success':-1}";
		}
		Map<String, Boolean> sessionIds = loginUserMap.get(username);
		
		//获取后面一个用户登录的时间
		Map<String, Object> loginTime = (Map<String, Object>) session.getServletContext().getAttribute("loginTime");
		Date time = (Date) loginTime.get(username);
		//Ip一个sessionid一个ip，因此当用户登录的时候，获取为false那个的sessionid对应的ip
		Map<String, Object> loginUserIp = (Map<String, Object>) session.getServletContext().getAttribute("loginUserIp");
		String ip = "";
		int i = 0;
		/*存在问题：当用户退出之后，点击网页返回按钮，此处报错java.lang.NullPointerException*/
		for(String key : sessionIds.keySet()){
			i++;
			//判断是否是第一个登录的用户，是才有权限处理后续用户的登录
			if(key.equals(sessionId) && i == 1){
				//查找是否存在false，存在则返回false和用户的信息
				for(String key1 : sessionIds.keySet()){
					if(!sessionIds.get(key1)){
						ip = (String) loginUserIp.get(key1);
						return "{'success':false,'ip':'"+ip+"','time':'"+time.toString()+"'}";
					}else {
						return "{'success':true}";
					}
				}
			}else if(key.equals(sessionId) && i > 1){//如果不是第一个用户，则返回true，不做任何处理
				return "{'success':true}";
			}
		}
		System.out.println("check没有此sessionid返回-1");
		return "{'success':-1}";
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
					MyLogger.exit.info("允许后续用户登录--用户名：" + username + "，登录时间：" + new Date());
					sessionIds.put(key, true);
				}else {//不允许登录
					MyLogger.exit.info("拒绝后续用户登录--用户名：" + username + "，拒绝时间：" + new Date());
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