var TableTool=Class.extend({
	defaultConfig: {
		table: document.body,
		data: {
			thead: [],
			sortSwitch: [],
			tbody: {}
		},
		isFloat: true,
	},
	//设置参数
	init: function(config) {
		this.config = config || this.defaultConfig;
		return this;
	},
	show:function(){
        this.render();
        this._bind();
        if(this.config.isFloat){
        	this.isFloat();
        }
	},
	render: function() {
		var tableDataThead = this.config.data.thead; //数组
		tableDataTbody = this.config.data.tbody; //对象
		var theadStr = '', //保存表头信息
			tbodyStr = '',
			html = ''; //整个表的信息
		//拼接表头数组
		for (var i = 0; i < tableDataThead.length; i++) {
			var temHeadStr = ''; //临时字符串清空
			temHeadStr = '<th>' + tableDataThead[i] + '<span></span></th>';
			theadStr += temHeadStr;
		}
		//拼接表身数组
		for (var Arr in tableDataTbody) {
			var temBodyLineStr = '';
			var temBodyCloStr = '';
			for (var i = 0; i < tableDataTbody[Arr].length; i++) {
				var puzzleStr = '';
				puzzleStr = '<td>' + tableDataTbody[Arr][i] + '</td>';
				temBodyCloStr += puzzleStr;
			}
			temBodyLineStr = '<tr>' + temBodyCloStr + '</tr>';
			tbodyStr += temBodyLineStr
		}
		html = '<table border=1 class="table-tool">' + '<thead class="real-head">' + '<tr>' + theadStr + '</tr>' + '</thead>' + '<tbody>' + tbodyStr + '</tbody>' + '</table>';
		this.config.table.innerHTML = html;
	},
	isFloat:function(){ //浮动表头
		var tHead = $myApi.dom(this.config.table,'thead'),
			thead_height=tHead.offsetHeight;
			tHeadStyle=tHead.style;
			tHeight = this.config.table.offsetHeight,
			headOffsetTop = $myApi.offset(tHead).t,
			sTop = document.body.scrollTop;
		if (sTop > headOffsetTop&&sTop<(headOffsetTop + tHeight-thead_height)) { //使排序完后表头依旧浮动
				tHeadStyle.position='fixed';
				tHeadStyle.top=0+'px';
		} 
		window.addEventListener('scroll',function(){ //事件监听
			sTop = document.body.scrollTop;
			if (sTop > headOffsetTop&&sTop<(headOffsetTop + tHeight-thead_height)) {
				tHeadStyle.position='fixed';
				tHeadStyle.top=0+'px';
			} else {
				tHeadStyle.position='static';
				tHeadStyle.top='';
			}
		},false);
	},
	_bind: function() {
		var _this = this,
			spanList = $myApi.domAll('.real-head span'),
			sortFlag = {};
		this.sortFlag = sortFlag;
		for (var i = 0; i < this.config.data.thead.length; i++) {
			this.sortFlag[i] = true;
		}
		$myApi.addEvt($myApi.dom('.real-head'),'click', function(event) {
			var e = event || window.event;
			var target = e.target || e.srcElement,
				indexSpan;
			if (target.nodeName.toLowerCase() == 'span') {
				indexSpan = $myApi.index(spanList, target);
				if (_this.sortFlag[indexSpan] == true) {
					_this.sortU(indexSpan);
					_this.show();
					_this.sortFlag[indexSpan] = false;
				} else {
					_this.sortD(indexSpan);
					_this.show();
					_this.sortFlag[indexSpan] = true;
				}
			}

		}, false);
	},
	sortD: function(index) {
		var sortData = this.config.data.tbody,
			newArr = [],
			newObj = {};
		for (key in sortData) {
			newArr.push(sortData[key]);
		}
		newArr.sort(function(a, b) {
			return a[index] - b[index];
		})
		for (var i = 0; i < newArr.length; i++) {
			newObj[i + 1] = newArr[i];
		}
		this.config.data.tbody = newObj;
	},
	sortU: function(index) {
		var sortData = this.config.data.tbody,
			newArr = [],
			newObj = {};
		for (key in sortData) {
			newArr.push(sortData[key]);
		}
		newArr.sort(function(a, b) {
			return b[index] - a[index];
		})
		for (var i = 0; i < newArr.length; i++) {
			newObj[i + 1] = newArr[i];
		}
		this.config.data.tbody = newObj;
	}
});