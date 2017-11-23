	var centerPanel = new Ext.tab.Panel({
			region:"center",
			height:window.innerHeight - 50,
			width:window.innerwidth - 200,
			frame:true,
			
			//添加标签页
			items:[{
				title:"首页",
				html:"欢迎来到首页",
				closable:false
			}]
		});
