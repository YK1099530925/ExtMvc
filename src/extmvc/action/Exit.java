package extmvc.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
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
	@RequestMapping(value="/isHasSession")
	@ResponseBody
	public String isHasSession(String username, HttpServletRequest request){
		
		/* 只能一方登录，不能实现双方同时在线
		 * 轮训session，60秒发送一次请求，如果在另一地方登录，然后将session中的sessionid保存成为另一处的sessionid
		 * 然后将本地的session清除，1：在另一地方登录，如何清除本地session？（本地的一次回话即session，如果未关闭回话
		 * sessionid应该不会变，因此，当另一地方登录的时候，将另一处的sessionid放入loginUserMap中，将本地的sessionid
		 * 从中移除，所以判断账户是否在另一处登录，只需要判断此处的loginUserMap中的username对应的sessionid是否是本地的sessionid
		 * 如果不是，将告诉前台，账户在另一处登录，或者是系统超时），因此只需要拿到loginUserMap判断就知道是否在另一处登录
		 * 通过session中的userLogin来判断
		 * */
		
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
