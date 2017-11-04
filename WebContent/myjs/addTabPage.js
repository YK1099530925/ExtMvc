	
	/* 这里遇到一个问题
	 * 因为这个函数中引用了centerPanel，在之前，centerPanel在mainWindow.js中，
	 * 而如果我们要在mainWindow.js中使用addTabPage，就必须在loginSuccess.jsp引用
	 * mainWindow.js之前引用addTabPage.js，所以在加载addTabPage.js之后，其中没有
	 * centerPanel，所以addTabPage始终都显示未定义
	 * */
	
	/* 添加一个新的标签页 */	
	addTabPage = function(node){
		//为添加判断，因此如果多次点击会出现多个同样的页面
		var isNewTab = true;
		//alert(node.raw.url);//但是通过node.get("url")拿不到其中的url值
		
		//得到节点的id
		var nodeId = node.get("id");
		
		/* 判断一个tab页是否存在
		 * 方法1：判断node的id是否存在，如果存在就设置此id的tab为激活状态
		 * 如下面实现的方式：通过传过来节点的id，我们先添加一个tab页面，并且设置页面的id为此节点的id，
		 * 然后再一次进入的时候，这个tab的id已经存在了，所以就直接设置此页面为激活状态。
		 * 方法2：为每一个节点设置一个全局变量（userInfoIsOpen=false），然后第一打开页面之后设置其为true，
		 * 另外还需要设置一个监听器，监听当页面关闭的时候设置userInfoIsOpen为false，不然此页面将永远都无法
		 * 打开
		 * 注：但是方式2需要为每一个节点设置，工作量将大大增加，维护也增大了，所以方式1最合理
		 * */
		
		/* Ext.getCmp是通过id的值拿到这个对象，但是为什么就拿不到树节点呢？
		 * 树叶子节点(id:"userInfo"),然后通过node.get("id")(这里的id
		 * 是叶子节点的属性)，得到值为userInfo，然后给tabPage的id，然后才
		 * 能通过getCmp拿到tabPage
		 * 注：因为Tree的节点里面的id不是HTML dom中id，所以用ext.getCmp
		 * 是获取不到的
		 * alert(Ext.getCmp("userInfo"));
		 */
		if(Ext.getCmp(nodeId)){
			centerPanel.setActiveTab(nodeId);//如果此tab页存在，设置此tab页为活动页面
			isNewTab = false;
		}
		if(isNewTab){
			var tabPage = centerPanel.add({
				id:nodeId,//如果是新的tab标签页，则给他的id设置为节点的id
				title:node.raw.text,
				closable:true,//是否可以关闭
				//加载页面中的内容使用autoLoad
				autoLoad:"../myjs/user.js"
			})
			centerPanel.setActiveTab(tabPage);
		}
	
	};