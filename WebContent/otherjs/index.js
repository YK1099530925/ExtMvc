Ext.onReady(
	function(){
		var mainWindow = new Ext.Window({
			width:800,
			height:500,
			title:"ExtMVC管理系统",
			pageY:50,
			maximizable:true,
			closable:false,
			resizable:false,//设置是否可以改变大小
			draggable:false,//设置是否可以拖动
			tools:[
				{id:"save",qtip:"保存"},
				{id:"help",qtip:"帮助"}
			]
		});
		mainWindow.show();
		
		var tb = new Ext.toolbar.Toolbar({
			height:30
		});
		
		var userMenu = new Ext.menu.Menu({
			items:[
				{text:"用户1"},
				{text:"用户2"}
			]
		});
		
		tb.add(new Ext.SplitButton({
			text:"用户管理",
			menu:userMenu
		}));
		
		var empMenu = new Ext.menu.Menu({
			items:[
				{text:"员工1"},
				{text:"员工2"}
			]
		});
		
		tb.add(new Ext.SplitButton({
			text:"员工管理",
			menu:empMenu
		}));
		
		tb.add(new Ext.Button({
			text:"帮助"
		}));
		
		tb.add(new Ext.Button({
			text:"退出"
		}));
		
		mainWindow.add(tb);
		
		var panel = new Ext.Panel({
			title:"标题"
		});
	}
);