package extmvc.interc;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import extmvc.entities.UserLogin;

public class LoginInterceptor extends HandlerInterceptorAdapter {

	//最终执行的方法
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
			Object handler, Exception ex)throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}

	//请求执行方法之后执行
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler,ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}

	//请求执行方法之前执行（在此先只做一个提示，提示用户，本账户在另一地方登录，然后在登录中将对方挤掉）
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler)throws Exception {
		//获取session
		HttpSession session = request.getSession();
		//获取session中的登录用户，如果没有登录
		UserLogin user = (UserLogin)session.getAttribute("userLogin");
		System.out.println("userLogin:" + user);
		Map<String, Object> loginUserMap1 = (Map<String, Object>)session.getServletContext().getAttribute("loginUserMap");
		System.out.println("loginUserMap1:" + loginUserMap1);
		if(session.getAttribute("userLogin") == null){
			System.out.println("未登录，转到登录页面");
		}
		//多用户登录限制，并给出提示信息
		boolean isLogin = false;
		if(user != null){
			Map<String, Object> loginUserMap = (Map<String, Object>)session.getServletContext().getAttribute("loginUserMap");
			String sessionId = session.getId();
			for(String key : loginUserMap.keySet()){
				//用户在另一处登录
				if(key.equals(user.getUsername()) && !loginUserMap.containsValue(sessionId)){
					isLogin = true;
					break;
				}
			}
		}
		if(isLogin){
			Map<String, Object> loginOutTime = (Map<String, Object>) session.getServletContext().getAttribute("loginOutTime");
			System.out.println("用户" + user.getUsername() + "于" + loginOutTime.get(user.getUsername()) + "在别处登录");
			//loginOutTime.remove(user.getUsername());
			//session.getServletContext().setAttribute("loginOutTime", loginOutTime);
			//return false;
		}
		return super.preHandle(request, response, handler);
	}
	

}
