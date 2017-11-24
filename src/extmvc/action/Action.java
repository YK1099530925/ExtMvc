package extmvc.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import extmvc.entities.Role;
import extmvc.entities.User;
import extmvc.service.BaseService;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

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
	
	@RequestMapping(value="/userDataSelect",produces="application/json;charset=utf-8")
	@ResponseBody
	public String userDataSelect(){
		
		List<Object[]> users = baseService.selectAllUser();
		JSONArray jsonArray = new JSONArray();
		Map<String, Object> map = new HashMap<>();
		for(Object obj[] : users){
			map.put("id", obj[0]);
			map.put("username", obj[1]);
			map.put("age", obj[2]);
			map.put("userrole", obj[3]);
			jsonArray.add(map);
		}
		JSONObject json2 = new JSONObject();
		json2.put("roots", jsonArray);
		System.out.println("json2" + json2);
		
		return json2.toString();
		
		/**如果使用延迟加载，在转换成json数据格式的时候，外键的值，存放不进来，
		 * 将会报错（no session），只有将外键去掉，才能转换格式，但是如果不适用延迟加载(在
		 * many-to-one中设置lazy="false")，则不会出现问题，但是使用lazy="false"的
		 * 消耗太大了
		 * */
		//1:去掉外键的方式
		/*JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setJsonPropertyFilter(new PropertyFilter() {
			@Override
			public boolean apply(Object sorce, String name, Object value) {
				if (name.equals("loginname") || name.equals("password") || name.equals("describ") || name.equals("id")) {
					return true;
				}
				return false;
			}
		});
		JSONArray jsonArray = JSONArray.fromObject(users, jsonConfig);
		System.out.println("jsonArray" + jsonArray);
		JSONObject json2 = new JSONObject();
		json2.put("roots", jsonArray);
		System.out.println("json:" + json2.toString());*/
		
		//2:
		/*JSONArray jsonArray = JSONArray.fromObject(users);
		System.out.println("jsonArray" + jsonArray);
		JSONObject json2 = new JSONObject();
		json2.put("roots", jsonArray);
		System.out.println(json2.toString());*/
		
		//3:
		/*Map<String, Object> map = new HashMap<>();
		map.put("roots",users);
		JSONObject jsonObject = JSONObject.fromObject(map);
		String json2 = jsonObject.toString();
		System.out.println("json:" + json2);
		*/
	}
	
/*	@ModelAttribute
	public void userModel(Integer id,String username,Integer age,Integer userrole,
			Map<String, Object> map){
		//判断id是否存在，如果存在则表示修改，如果不存在则表示添加
		if(baseService.getUserById(id) == null){
			User user = null;
			user.setId(id);
			user.setUsername(username);
			user.setAge(age);
			//拿到userrole对应的role
			Role role = baseService.getRole(userrole);
			user.setUserrole(role);
			//因为没有密码，因此自动设置
			user.setLoginname("tt");
			user.setPassword("123");
		}else {
			System.out.println("存在此人");
		}
		System.out.println("添加数据前的操作");
	}*/
	
	@RequestMapping(value="/addUser",method=RequestMethod.POST)
	@ResponseBody
	public String addUser(Integer id,String username,Integer age,Integer userrole){
		String mString = "";
		if(baseService.getUserById(id) == null){
			User user = new User();
			//user.setId(id);
			user.setUsername(username);
			user.setAge(age);
			//拿到userrole对应的role
			Role role = baseService.getRole(userrole);
			user.setUserrole(role);
			//因为没有密码，因此自动设置
			user.setLoginname("tt");
			user.setPassword("123");
			System.out.println(user);
			baseService.saveOrUpdate(user);
			mString = "{'success':'true'}";
		}else {
			System.out.println("存在此人");
			mString = "{'success':'false'}";
		}
		return mString;
	}
}
