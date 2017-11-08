//该代码是Extjs2.2的视频代码

Ext.onReady(
	function(){
		
		Ext.QuickTips.init();
		
		
		var loginPanel = new Ext.Panel({
			bodyPadding:15,
			renderTo:"login",
			title:"用户登录",
			width:300,
			height:150,
			pageX:500,
			pageY:200,
			frame:true,//填充颜色
			floating:true,//表示该panel是浮动的
			items:[{
				itemId:"user",
				xtype:"textfield",
				fieldLabel:"用户名",
				minLength:3,
				minLengthText:"用户名长度不能小于{0}",
				maxLength:12,
				maxLengthText:"用户名长度不能大于{0}",
				allowBlank:false,
				blankText:"用户名不能为空"
				
			},{
				xtype:"textfield",
				fieldLabel:"密码",
				inputType:"password",
				allowBlank:false,
				blankText:"密码不能为空"
			}],
			buttons:[
				{text:"登录",handler:function(){
					alert(1);
				}},
				{text:"重置"}
			]
		});
		
		
	}
);