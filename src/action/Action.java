package action;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Action {
	
	/**
	 * 用注解@RequestParam绑定请求参数到方法入参
	 * @param username
	 * @param password
	 */
	@RequestMapping(value="/loginform",method=RequestMethod.POST)
	@ResponseBody
	public String login(@RequestParam("username") String username,
			@RequestParam("password") String password){
		
		String msg = "";
		msg = "{success:true}";
		
		return msg;
	}
}
