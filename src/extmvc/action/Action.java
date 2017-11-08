package extmvc.action;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import extmvc.entities.User;
import extmvc.service.BaseService;

/**将请求域中的user同时放入session中，
 * SessionAttributes的value是一个
 * 字符串数组，能够放多个键
 * */
@SessionAttributes(value={"user"})
@Controller
public class Action {
	
	@Autowired
	private BaseService baseService;
	
	/**
	 * 用注解@RequestParam绑定请求参数到方法入参
	 * @param username
	 * @param password
	 * ResponseBody:注解返回的是一个json
	 * @ResponseBody :返回的json中有中文前台获取会出现乱码，可以在@RequestMapping里
	 * 		设置produces="application/json;charset=utf-8"
	 */
	@RequestMapping(value="/loginform",method=RequestMethod.GET,
			produces="application/json;charset=utf-8")
	@ResponseBody
	public String login(@RequestParam("loginname") String loginname,
			@RequestParam("password") String password, Map<String, Object> map){
		/*发送给前台的响应信息*/
		String msg = "";
		/*检查用户登录*/
		User user = baseService.userLogin(loginname, password);
		/*判断用户是否为空*/
		if(user != null){
			/* *
			 * 将user放在请求域中，同时添加@SessionAttribute
			 * 注解将user放入session中，用来保存登录信息
			 * */
			map.put("user", user);
			msg = "{success:true,msg:'登录成功...'}";
		}else{
			msg = "{success:false,msg:'登录失败，用户名或者密码错误'}";
		}
		return msg;
	}
	
	@RequestMapping(value="/userDataSelect",method=RequestMethod.GET)
	public String  userDataSelect(){
		System.out.println("userDataSelect");
		//List<User> users = baseService.selectAllUser();
		String msg = "chenggong";
		return msg;
	}
}
