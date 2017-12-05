package extmvc.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import extmvc.entities.UserLogin;

@Controller
public class Exit {

	@RequestMapping(value="/exit")
	public void exit(String username, HttpServletRequest request){
		System.out.println("-------正常退出，清除session和loginUserMap-------");
		HttpSession session = request.getSession();
		String sessionId = session.getId();
		List<String> sessionIds = new ArrayList<>();
		Map<String, List<String>> loginUserMap = (Map<String, List<String>>) session.getServletContext().getAttribute("loginUserMap");
		sessionIds = loginUserMap.get(username);
		sessionIds.remove(sessionId);
		loginUserMap.put(username, sessionIds);
		session.getServletContext().setAttribute("loginUserMap", loginUserMap);
		session.removeAttribute("userLogin");
		//session.invalidate();//调用此方法，将会触发sessionDestroyed监听器，将session销毁
	}
	
	//判断session是否还存在
	@RequestMapping(value="/isHasSession",method=RequestMethod.POST)
	@ResponseBody
	public String isHasSession(String username, String userrole, HttpServletRequest request){
		
		//System.out.println("username:" + username + ",userrole:" + userrole);
		//获取session
		HttpSession session = request.getSession();
		//获取sessionid
		String sessionId = session.getId();
		//获取loginUserMap
		Map<String, List<String>> loginUserMap = (Map<String, List<String>>) session.getServletContext().getAttribute("loginUserMap");
		List<String> sessionIds = new ArrayList<>();
		sessionIds = loginUserMap.get(username);
		if(sessionIds.contains(sessionId)){
			return "{'success':true}";
		}
		
		return "{'success':false}";
	}
}
