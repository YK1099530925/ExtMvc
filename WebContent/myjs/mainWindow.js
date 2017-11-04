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
	
	/* 主题栏 */
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
	
	/* 节点数据源 */
	var store = Ext.create('Ext.data.TreeStore', {
		root:{
			expanded:true,//默认展开根节点
			children:[{
				id:"userManage",
				text:"用户管理",
				leaf:false,//是否是叶子节点
				expanded:true,
				children:[{
					id:"userInfo",
					text:"用户信息",
					leaf:true,
					url:"userInfo"
				}]
			},{
				id:"deparManage",
				text:"部门管理",
				leaf:false,
				expanded:true,
				children:[{
					id:"deparInfo",
					text:"部门信息",
					leaf:true,
					url:"deparInf"
				}]
			},{
				id:"roleManage",
				text:"角色管理",
				leaf:false,
				expanded:true,
				children:[{
					id:"roleInfo",
					text:"角色信息",
					leaf:true,
					url:"roleInf"
				}]
			}]
		}
	});
		
	//导航栏
	var root1 = Ext.create('Ext.tree.Panel',{
		title:"管理界面",
		rootVisible:false,//设置根节点是否隐藏
		//通过数据源的方式将节点添加进来
		store:store,
		listeners:{ //添加监听，当按下节点到时候，增加一个标签页
			itemclick : function(view,node,item,index,e){
				if(node.get("leaf")){//通过leaf判断，如果是叶子节点，就添加tab页
					addTabPage(node);//添加新的标签页
					/* 获取叶子节点的文本值
					 * alert(record.get("text"));//获取叶子节点的text文本值
					 * alert(record.raw.text);//获取叶子节点的text文本值
					 */
				}
		} } 
	});
	
	var root2 = Ext.create('Ext.tree.Panel',{
		title:"其他",
		fields:["name","description"],//字段
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
		
	creatViewport();
})