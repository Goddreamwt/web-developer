
//模拟数据
var data = [{
		"src": "2.png",
		"title": "第一怪 竹筒当烟袋"
	},
	{
		"src": "3.png",
		"title": "第二怪 竹筒当烟袋"
	},
	{
		"src": "4.png",
		"title": "第三怪 竹筒当烟袋"
	},
	{
		"src": "5.png",
		"title": "第四怪 竹筒当烟袋"
	},
	{
		"src": "6.png",
		"title": "第五怪 竹筒当烟袋"
	},
	{
		"src": "7.png",
		"title": "第六怪 竹筒当烟袋"
	},
	{
		"src": "8.png",
		"title": "第七怪 竹筒当烟袋"
	},
	{
		"src": "9.png",
		"title": "第八怪 竹筒当烟袋"
	},
	{
		"src": "10.png",
		"title": "第九怪 竹筒当烟袋"
	},
	{
		"src": "11.png",
		"title": "第十怪 竹筒当烟袋"
	},
	{
		"src": "12.png",
		"title": "第十一怪 竹筒当烟袋"
	}
];

//jQuery方式

var waterfall = function(wrap, boxes) {
	//获取屏幕可以显示的列数
	var boxWidth = boxes.eq(0).width() + 40;
	var windowWidth = $(window).width();
    var colsNumber = Math.floor(windowWidth/boxWidth);
	//设置容器的宽度
	wrap.width(boxWidth * colsNumber);

	//定义一个数组并存储每一列的高度
	var everyHeight = new Array();//定义一个数据存储每一列的高度
	for(var i = 0; i < boxes.length; i++) {
		if(i < colsNumber) {
			everyHeight[i] = boxes.eq(i).height() + 40;
		} else {
			//获取最小列的高度
			var minHeight = Math.min.apply(null, everyHeight);
			//获取最小列的索引
			var minIndex = getIndex(minHeight, everyHeight);
			var leftValue = boxes.eq(minIndex).position().left;
			//设置盒子样式
			setStyle(boxes.eq(i), minHeight, leftValue, i);
			//更新最小列的高度
			everyHeight[minIndex] += boxes.eq(i).height() + 40;
		};
		//鼠标经过呈现半透明的交互效果
        boxes.eq(i).hover(function(event){
        	   $(this).stop().animate({
        	   	'opacity':'0.5'
        	   },500);
        },function(event){
        	  $(this).stop().animate({
        	  	'opacity':'1'
        	  },1000);
        });
	}
};

//获取最小列的索引
function getIndex(minHeight, everyHeight) {
	for(index in everyHeight) {
		if(everyHeight[index] == minHeight) {
			return index;
		}
	};
};

//设置追加盒子的样式
var getStartNumber = 0;
var setStyle = function(box, top, left, index) {
	if(getStartNumber >= index) {
		return false;
	};
	box.css({
		'position': 'absolute',
		'top': top,
		'left': left,
		'opacity': '0'
	}).stop().animate({
		'opacity': '1'
	}, 1000);
	getStartNumber = index;
};

//追加条件：最后一个盒子的top值+其高度<document高度值+滚动条滚动的值
//数据请求检验
var getCheck = function(wrap) {
	//获取文档高度
	var docunmentHeight = $(window).height();
	//获取文档向上滚动的高度
	var scrollHeight = $(window).scrollTop();
	//获取最后一个盒子所在列的总高度

	var boxes =wrap.children('div');
	var lastBoxTop = boxes.eq(boxes.length - 1).offset().top;
	var lastHeight = boxes.eq(boxes.length - 1).height() + 20;
	var lastColHeight = lastBoxTop + lastHeight;
	return docunmentHeight + scrollHeight >= lastColHeight ? true : false;
};

//追加盒子函数
var appendBox = function(wrap) {
	if(getCheck(wrap)) {
		for(i in data) {
			var innerString = '<div><img src="img/' + data[i].src + '"><a href="http://www.imooc.com">' + data[i].title + '</a></div>';
			wrap.append(innerString);
		};
	}else{
	  return false;	
	};
	waterfall(wrap, wrap.children('div'));
}

$(document).ready(function(event) {
	//获取容器与盒子
	var wrap = $('#wrap');
	var boxes = wrap.children('div');
	//加载盒子
	waterfall(wrap, boxes);
    //滚动事件
	$(this).scroll(function(event) {
		appendBox(wrap, boxes);
	});
});