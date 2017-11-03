//面板panel
Ext.onReady(
	function(){
		//renderTo：表示这个panel显示在哪个id中（这个id对应jsp页面的id）
		//applyTo:呈现在哪个HTML元素里面，用id指明(但是用不了)
		//contentEl:呈现哪个HTML元素里面
		var myPanel = new Ext.Panel({
			renderTo:hello,
			//applyTo:hello,
			width:400,
			height:140,
			pageX:100,
			pageY:50,
			title:"Panel",
			html:"欢迎大家欢迎大家欢迎大家" + "欢迎大家欢迎大家欢迎大家" +
				 "欢迎大家欢迎大家欢迎大家" + "欢迎大家欢迎大家欢迎大家" +
				 "欢迎大家欢迎大家欢迎大家" + "欢迎大家欢迎大家欢迎大家" +
				 "欢迎大家欢迎大家欢迎大家" + "欢迎大家欢迎大家欢迎大家" +
				 "欢迎大家欢迎大家欢迎大家" + "欢迎大家欢迎大家欢迎大家" ,
			autoScroll:true,//支持滚动条
			collapsible:true,//可收缩的panel
			titleCollapse:true,//点击标题栏就能够收缩，不一定需要点击收缩按钮
			tbar:[
				{text:"顶部按钮1",handler:function(){
					Ext.MessageBox.alert("单击","点击了顶部按钮1");
				}},
				{text:"顶部按钮2"}
			],
			bbar:[
				{text:"底部按钮1"},
				{text:"底部按钮2"}
			]
		});
		
	}
);