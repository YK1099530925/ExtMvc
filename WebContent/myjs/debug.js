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
		height:150,
		width:300,
		pageX:500,
		pageY:200,
		frame:true,//是否渲染表单，给表单填充颜色
		renderTo:"form",
		defaultType:"textfield",//设置表单字段的默认类型
		defaults:{//统一设置表单字段默认属性
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
		}],
		buttons:[{
			text:"登录",
			handler:function(){
				//window.location.href="views/loginSuccess.jsp";
				
				/*//获取字段的方式
				var formFields = loginform.getForm().getValues();
				alert(formFields["username"]);*///或者fromFields.username
				
				
				/*//Ajax请求
				    Ext.Ajax.request({
					url:"loginform",
					params:{username:"123",password:"1231312"},
					callback:function(options,success,response){
						alert(11);
					}
				});*/

				/*如果以get的方式提交，姓名中不能包含有中文，否则会出现乱码
				 * 如果以post的方式提交没有任何问题*/
				loginform.getForm().submit({
					url:"loginform",
					method:"get",
					waitMsg:"正在登录，请稍等...",
					success:function(form,action){
						Ext.Msg.alert("提示",action.result.msg);
						window.location.href="views/loginSuccess.jsp";
					},
					failure:function(form,action){
						Ext.Msg.alert("提示",action.result.msg);
					}
				});
				
			}
		},
		{
			text:"注册"
		}]
	});
	
});