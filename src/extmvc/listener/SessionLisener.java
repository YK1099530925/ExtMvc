package extmvc.listener;

import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import extmvc.entities.UserLogin;

public class SessionLisener implements HttpSessionListener {

	@Override
	public void sessionCreated(HttpSessionEvent arg0) {

	}

	@Override
	public void sessionDestroyed(HttpSessionEvent sessionEvent) {
		System.out.println("-----销毁session-----");
		HttpSession session = sessionEvent.getSession();
		String sessionId = session.getId();
		System.out.println("将要销毁的sessionId:" + sessionId);
		//在session销毁的时候将loginUserMap中的键值对清楚
		UserLogin user = (UserLogin) session.getAttribute("userLogin");
		if (user != null) {
			System.out.println("user存在，将其loginUserMap中的键值对清除:" + user);
			Map<String, Object> loginUserMap = (Map<String, Object>) session.getServletContext().getAttribute("loginUserMap");
			if (loginUserMap.get(user.getUsername()).equals(sessionId)) {
				loginUserMap.remove(user.getUsername());
				session.getServletContext().setAttribute("loginUserMap", loginUserMap);
			}
		}
	}

}
