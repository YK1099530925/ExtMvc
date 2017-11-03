Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	
	
	/*var mainWindow = new Ext.window.Window({
		renderTo:Ext.getBody(),
		width:window.innerWidth,
		height:window.innerHeight,
		items:[{
			xtype:"panel",
			width:200,
			height:500,
			html:"添加面板"
		}]
	});
	mainWindow.show();*/
	
	creatViewport = function(){
		var viewport = new Ext.Viewport({
			id:"viewport",
			layout:"border",
			defaults:{//设置默认属性
				collapsible:true
			},
			items:[
				northPanel,//这是一个函数，返回一个panel，这个函数相当于对象
				westPanel,//这是一个变量
				centerPanel
			]
		});
	};
	
	var northPanel = new Ext.panel.Panel({
			region:"north",
			height:70,
			frame:true,
			items:[{
				xtype:"box",//设置为box图片充满整个panel
				name:"ykImg",
				id:"ykImg",
				autoEl:{
					tag:"img",//指定为img标签
					src:"../imgs/logo.png",//指定路径，一般为相对路劲
					cls:"main-logo"
				}
			}]
		});
	
	//导航栏
	var root1 = Ext.create('Ext.tree.Panel',{
		title:"管理界面",
		rootVisible:false,//设置根节点是否隐藏
		root:{
			expanded:true,//默认展开根节点
			children:[{
				text:"用户管理",
				leaf:false,//是否是叶子节点
				expanded:true,
					children:[{
						text:"用户信息",
						leaf:true,
						url:"user"
						}]
			},{
				text:"角色管理",
				leaf:false,
				expanded:true,
					children:[{
						text:"角色信息",
						leaf:true,
						url:"jiaose"
						}]
			}]
		},
		listeners:{ 
			itemclick : function(node){
				Ext.Msg.alert("提示","点击了节点");
		} } 
	});
	
	var root2 = Ext.create('Ext.tree.Panel',{
		title:"其他",
		fields:["name","description"],
		columns:[{
			xtype:"treecolumn",//树状表格列表
			text:"名称",
			dataIndex:"name",
			width:100,
			sortable:true
		},{
			text:"描述",
			dataIndex:"description",
			flex:1,
			sortable:true
		}],
		root:{
			name:"其他",//用title不能显示
			expanded:true,
			description:"树根的描述",
			children:[{
				name:"节点1",
				description:"节点1的描述",
				leaf:true
			},{
				name:"节点2",//用text不能显示
				description:"节点2的描述",
				leaf:true
			}]
		}
	});
	
	//用函数的方式
	/*westPanel = function(){
		var panel = new Ext.panel.Panel({
			layout:"accordion",
			collapsible:true,//是否能够收缩
			split:true,
			region:"west",//位于左边
			title:"导航菜单",
			frame:true,
			height:window.innerHeight-50,
			width:200,
			items:root
		});
		return panel;
	};*/
	//用变量的方式-对象的引用
	var westPanel = new Ext.panel.Panel({
			layout:"accordion",
			collapsible:true,//是否能够收缩
			split:true,
			region:"west",//位于左边
			title:"导航菜单",
			frame:true,
			height:window.innerHeight-50,
			width:200,
			items:[
				root1,
				root2
			]
		});
		
	function addTabPage(){
		var index = centerPanel.items.length + 1;//得到标签页的长度，有几个标签页长度就为几
		var tabPage = centerPanel.add({
			title:"新增tab标签页" + index,
			html:"新增标签页" + index + "内容",
			closable:true
		})
		centerPanel.setActiveTab(tabPage);
	}
		
	var centerPanel = new Ext.tab.Panel({
			region:"center",
			height:window.innerHeight - 50,
			width:window.innerwidth - 200,
			frame:true,
			//添加标签页
			items:[{
				title:"标签页1",
				html:"标签页1",
				closable:true
			}],
			buttons:[{
				xtype:"button",
				text:"点击添加新页",
				handler:addTabPage
			}]
		});
		
	
	
	var eastPanel = Ext.create('Ext.panel.Panel',{
		title:"右边",
		html:"右边",
		width:100,
		height:200
	});

	creatViewport();
})