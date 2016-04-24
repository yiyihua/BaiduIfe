// var TableTool = (function() {
// 		var table=function(config) {}
// 		table.prototype = {
// 			defaultConfig: {
// 				append: document.body,
// 				data: {
// 					thead: [],
// 					sortSwitch: [],
// 					tbody: {}
// 				},
// 				isSort: true,
// 			},
// 			//设置参数
// 			init: function(config) {
// 				this.config = config || this.defaultConfig;
// 				this.render();
// 				this._bind();
// 				return this;
// 			},
// 			render: function() {
// 				var tableDataThead = this.config.data.thead; //数组
// 				tableDataTbody = this.config.data.tbody; //对象
// 				var theadStr = '', //保存表头信息
// 					tbodyStr = '',
// 					html = '';//整个表的信息
// 				//拼接表头数组
// 				for (var i = 0; i < tableDataThead.length; i++) {
// 					var temHeadStr = ''; //临时字符串清空
// 					temHeadStr = '<th>' + tableDataThead[i] + '<span></span></th>';
// 					theadStr += temHeadStr;
// 				}
// 				//拼接表身数组
// 				for (var Arr in tableDataTbody) {
// 					var temBodyLineStr = '';
// 					var temBodyCloStr = '';
// 					for (var i = 0; i < tableDataTbody[Arr].length; i++) {
// 						var puzzleStr = '';
// 						puzzleStr = '<td>' + tableDataTbody[Arr][i] + '</td>';
// 						temBodyCloStr += puzzleStr;
// 					}
// 					temBodyLineStr = '<tr>' + temBodyCloStr + '</tr>';
// 					tbodyStr += temBodyLineStr
// 				}
// 				html = '<table border=1 class="table-tool">' + '<thead class="real-head">' + '<tr>' + theadStr + '</tr>' + '</thead>' + '<tbody>' + tbodyStr + '</tbody>' + '</table>';
// 				this.config.table.innerHTML = html;
// 			},
// 			_bind: function() {
// 				var self = this,
// 					spanList = $myApi.domAll('.real-head span'),
// 					sortFlag = {};
// 				this.sortFlag = sortFlag;
// 				for (var i = 0; i < this.config.data.thead.length; i++) {
// 					this.sortFlag[i] = true;
// 				}
// 				$myApi.dom('.real-head').addEventListener('click', function(event) {
// 					var e = event || window.event;
// 					var target = e.target||e.srcElement,
// 						indexSpan;
// 					if (target.nodeName.toLowerCase()=='span') {
// 						indexSpan = $myApi.index (spanList,target);
// 						if (self.sortFlag[indexSpan] == true) {
// 							self.sortUp(indexSpan);
// 							self.render();
// 							self._bind();
// 							self.sortFlag[indexSpan] = false;
// 							console.log(self.sortFlag[indexSpan]);
// 						} else {
// 							self.sortDown(indexSpan);
// 							self.render();
// 							self._bind();
// 							self.sortFlag[indexSpan] = true;
// 						}
// 					}

// 				 }, false);
// 			},
// 			sortDown: function(index) {
// 				var sortData = this.config.data.tbody,
// 					newArr = [],
// 					newObj = {};
// 				for (key in sortData) {
// 					newArr.push(sortData[key]);
// 				}
// 				newArr.sort(function(a, b) {
// 					return a[index] - b[index];
// 				})
// 				for (var i = 0; i < newArr.length; i++) {
// 					newObj[i + 1] = newArr[i];
// 				}
// 				this.config.data.tbody = newObj;
// 			},
// 			sortUp: function(index) {
// 				var sortData = this.config.data.tbody,
// 					newArr = [],
// 					newObj = {};
// 				for (key in sortData) {
// 					newArr.push(sortData[key]);
// 				}
// 				newArr.sort(function(a, b) {
// 					return b[index] - a[index];
// 				})
// 				for (var i = 0; i < newArr.length; i++) {
// 					newObj[i + 1] = newArr[i];
// 				}
// 				this.config.data.tbody = newObj;
// 			}
// 		}
// 		return table;
// 	})()
	//调用
var TableTool=Class.extend({ //class类
	defaultConfig: {
		table: document.body,
		data: {
			thead: [],
			sortSwitch: [],
			tbody: {}
		}
	},
	//设置参数
	init: function(config) {
		this.config = config || this.defaultConfig;
		return this;
	},
	show:function(){
        this.render();
        this._bind();
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
