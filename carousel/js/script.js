//封装一个代替getElementById()的方法
function byId(id) {
	return typeof(id) === "string" ? document.getElementById(id) : id;
}

//全局变量
var index = 0,
	timer = null
pics = byId("banner").getElementsByTagName("div"),
	dots = byId("dots").getElementsByTagName("span"),
	prev = byId("prev"),
	next = byId("next"),
	len = pics.length,
	menu = byId("menu-content"),
	subMenu=byId("sub-menu"),
	innerBox=subMenu.getElementsByClassName("inner-box"),
	menuItems = menu.getElementsByClassName("menu-item");
//注意：getElementsByClassName这个方法在ie8及其浏览器中，不能使用。

function slideImg() {
	var main = byId("main");
	//滑过清除定时器，离开继续
	main.onmouseover = function() {
		//滑过清除定时器
		if(timer) {
			clearInterval(timer);
		}
	}
	main.onmouseout = function() {
		timer = setInterval(function() {
			index++; //len=3 
			if(index >= len) {
				index = 0;
			}
			//切换图片
			changeImg();
		}, 3000);
	}
	//自动在main触发鼠标离开的事件
	main.onmouseout();

	//遍历所有圆点，且绑定事件，点击圆点切换图片
	for(var d = 0; d < len; d++) {
		//给所有span添加一个id的属性，值为d作为当前span的索引
		dots[d].id = d;
		dots[d].onclick = function() { //注意：function改变作用域，d值始终为3
			//改变index为当前span的索引
			index = this.id;
			//调用changeImg实现切换图片
			changeImg();
		}
	}

	//下一张
	next.onclick = function() {
		index++;
		if(index >= len) {
			index = 0;
		}
		//调用changeImg实现切换图片
		changeImg();
	}

	//上一张
	prev.onclick = function() {
		index--;
		if(index < 0) {
			index = len - 1;
		}
		//调用changeImg实现切换图片
		changeImg();
	}

	//导航菜单
	//遍历主菜单，且绑定事件
	for(var m = 0; m < menuItems.length; m++) {
		//给每一个menu-item定义data-index属性，作为索引
		menuItems[m].setAttribute("data-index", m);
		menuItems[m].onmouseover = function() {
			subMenu.className="sub-menu";
			var idx = this.getAttribute("data-index");
			//遍历所有子菜单，将每一个都隐藏
			for (var j=0;j<innerBox.length;j++) {
				innerBox[j].style.display='none';
				menuItems[j].style.background="none";
			}
			menuItems[idx].style.background='rgba(0,0,0,0.1)';
			innerBox[idx].style.display='block';
		}
	}
	menu.onmouseout=function(){
		subMenu.className="sub-menu hide";
	}
	subMenu.onmouseover=function(){
		this.className="sub-menu";
	}
	subMenu.onmouseout=function(){
		subMenu.className="sub-menu hide";
	}
}

//切换图片
function changeImg() {
	//遍历banner下所有的div及dots下所有的span，将div隐藏，将span清除类
	for(var i = 0; i < len; i++) {
		pics[i].style.display = 'none';
		dots[i].className = "";
	}
	//根据index索引找到当前div和当前span，将其显示出来和设置为当前span
	pics[index].style.display = 'block';
	dots[index].className = "active";
}
slideImg();