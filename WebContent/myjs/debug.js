Ext.onReady(function(){
	
	//初始化信息提示功能
	Ext.QuickTips.init();
	
/*	
	//MessageBox是异步的，它的调用不会停止浏览器中代码的执行
	//Ext.Msg.alert("提示","Msg逗号分隔参数列表");
	//Ext.MessageBox.alert("提示","Msg逗号分隔参数列表");//和上面是一样的Msg是MessageBox的别名
	//Ext.Msg.alert("彩色","<font color=red>支持HTML格式文本</font>");
	*/
	/*Ext.Msg.alert("提示","单击确定返回id",clickBack);
	function clickBack(id){
		alert("单击的按钮ID是"+ id);
	}	
	
	var config = {
		title:"Json",
		msg:"Json配置对象"
	};
	Ext.Msg.show(config);*/
	//进度条
	/*var msgBox = Ext.Msg.show({
		title:"提示",
		msg:"动态更新的进度条和信息文字",
		modal:true,
		width:300,
		progress:true
	})
	var count = 0;
	var percentage = 0;
	var progressText = "";
	var task = {
		run:function(){
			count++;
			//计算进度
			percentage = count / 10;
			//生成进度条的文字
			progressText = "当前完成进度" + percentage * 100 + "%";
			//更新信息提示对话框
			msgBox.updateProgress(percentage,progressText,
				"当前时间" + Ext.util.Format.date(new Date(),'Y-m-d g:i:s'));
			//刷新10次后关闭信息提示对话框
			if(count > 10){
				Ext.TaskManager.stop(task);
				msgBox.hide();
			}
		},
		interval:1000
	}
	Ext.TaskManager.start(task);*/
	
	var loginform = new Ext.form.Panel({
		title:"用户登录",
		height:200,
		width:300,
		pageX:500,
		pageY:100,
		frame:true,//是否渲染表单，给表单填充颜色
		renderTo:"form",
		buttonAlign:"center",
		defaultType:"textfield",//设置表单字段的默认类型
		defaults:{//统一设置表单字段默认属性
			margin:"10 0 10 50",
			labelSeparator:":",
			labelWidth:50,//标签宽度
			width:200,//字段宽度
			allowBlank:false,//是否为空
			blankText:"不能为空",
			labelAlign:"right",//标签对其方式
			msgTarget:"qtip"//显示一个浮动的提示信息
		},
		items:[{
			id:"username",
			fieldLabel:"用户名",
			name:"username",
			value:"yk",
			selectOnFocus:true//得到焦点时自动选的文本
		},
		{
			id:"password",
			fieldLabel:"密码",
			inputType:"password",
			name:"password",
			value:"123",
			minLength:3,
			minLengthText:"密码长度不能小于{0}"
		},{
			margin:"10 0 10 70",
			id:"login",
			xtype:"radiogroup",
			columns:2,
			//allowBlank:false,//false代表至少选择一项
			//blankText:"至少选择一项",
			items:[{
				name:"login",
				boxLabel:"超管",
				inputValue:"UserLogin",
				checked:true//默认选项
			},{
				name:"login",
				boxLabel:"用户",
				inputValue:"User"
			}]
		}],
		buttons:[{
			text:"登录",
			handler:function(){
				/*如果以get的方式提交，姓名中不能包含有中文，否则会出现乱码
				 * 如果以post的方式提交没有任何问题*/
				loginform.getForm().submit({
					url:"loginform",
					method:"post",
					waitMsg:"正在登录，请稍等...",
					success:function(form,response){
						if(response.result.limite == "false"){
							Ext.Msg.confirm("等待","等待验证",function(e){
								if(e=="no"){
									alert("取消验证");
									//在这儿发送取消验证的请求
								}
							});
							Ext.TaskManager.start(isLogin);
						}else{
							Ext.Msg.alert("成功",response.result.msg);
							window.location.href="views/loginSuccess.jsp";
						}
						
					},
					failure:function(form,response){
						Ext.Msg.alert("错误",response.result.msg);
					}
				});
				
			}
		},
		{
			text:"注册"
		}]
	});
	
	//问题：如果在直验证的时候，对面没有允许（即删掉了sessionid），设置success为-1表示为删掉了sessionid，则提示对方未允许
	var isLogin = {
		run:function(){
			Ext.Ajax.request({
				url:"isHasSession",
				method:"post",
				params:loginform.getForm().getValues(),
				disableCaching:true,
				timeout:100000,//最大等待时间
				success:function(response,options){
					var res = Ext.JSON.decode(response.responseText);
					if(res.success){
						//因为如果返回-1，也是代表的真（一切不为0的数都表示真）
						if(res.success == -1){
							Ext.Msg.alert("提示","未允许登录，请重新登录");
							Ext.TaskManager.stop(isLogin);
						}else{
							Ext.Msg.alert("isLogin","登录成功");
							window.location.href = "views/loginSuccess.jsp";
							Ext.TaskManager.stop(isLogin);
						}
					}
				},
				failure:function(response,options){
					Ext.Msg.alert("失败","系统已超时，请重新登录...");
					window.location.href = "#";
					Ext.TaskManager.stop(isLogin);
				}
			});
		},
		interval:5000
	}
});