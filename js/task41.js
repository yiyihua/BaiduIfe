var CalenderTool=Class.extend({
	defaultConfig:{
		calender:document.body,
		now:new Date()
	},
	init:function(config){
		this.config=config||this.defaultConfig;
		this.flag=true;
		return this;
	},
	render:function(){
		this.config.calender.innerHTML='';
		var nstr =this.date||new Date(); //当前Date资讯
	    var year = nstr.getFullYear(); //年份
	    var month = nstr.getMonth(); //月份
	    var day= nstr.getDate(); //今日日期
	    var n1str = new Date(year, month, 1); //当月第一天Date资讯
	    var firstday = n1str.getDay(); //当月第一天星期几
	    var week=['日','一','二','三','四','五','六'];
	    var m_days = new Array(31, 28 + this.is_leap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); //各月份的总天数
	    var tr_str = Math.ceil((m_days[month] + firstday) / 7); //表格所需要行数
		var html_head='<div class="cal_head"><span id="col_left"></span><span style="color:white;font-weight:bold;">'+year+'年'+(month+1)+'月</span><span id="col_right"></span></div>',
		    theadStr='', //保存表头信息
			tbodyStr='',
			html=''; //整个表的信息
		//拼接表头数组
		for (var i = 0; i <week.length; i++) {
			var temHeadStr = ''; //临时字符串清空
			temHeadStr = '<th>'+week[i]+'</th>';
			theadStr += temHeadStr;
		}
		//拼接表身数组
	    for (i = 0; i < tr_str; i++) { //表格的行
	    	var trStr='';
	    	for (k = 0; k < 7; k++) { //表格每行的单元格
	    		idx = i * 7 + k; //单元格自然序列号
	    		date_str = idx - firstday + 1; //计算日期
	    		(date_str<=0||date_str>m_days[month])?date_str="&nbsp;": date_str = idx - firstday + 1; //过滤无效日期（小于等于零的、大于月总天数的）
	    		//打印日期：今天底色为红
	    		(year==this.config.now.getFullYear()&&month==this.config.now.getMonth()&&date_str==this.config.now.getDate())?trStr+='<td style="background-color:red;color:white;">' + date_str + "</td>": trStr+="<td>" + date_str + "</td>";
	    	}
	    	tbodyStr+='<tr >'+trStr+'</tr>'; //表格的行结束
	    }
		html='<table border="0" cellspacing="0" cellpadding="0" class="table_calender">' + '<thead class="calender-head">' + '<tr>' + theadStr + '</tr>' + '</thead>' + '<tbody id="col_body">' + tbodyStr + '</tbody>' + '</table>';
		this.div=$myApi.byId('col_input')||document.createElement('div');
		this.div.id='col_input';
		this.div.innerHTML = html_head+html;
		this.div.style.display='none';
		this.createInput();
		this.config.calender.appendChild(this.div);
		this.date=nstr; //save the date
		this._bind();
	},
	createInput:function(){
		var str='<span class="cal_icon" id="cal_icon"></span><input id="cal_input" type="text"/>'
		this.config.calender.innerHTML=str;
		this.input= $myApi.byId('cal_input');
		this.icon= $myApi.byId('cal_icon');
	},
	show:function(){
		this.render();
		this.div.style.display='block';
	},
	hide:function(){
		this.div.style.display='none';
	},
	_bind:function(){
		var _this=this;
		$myApi.byId('col_left').addEventListener('click',function(){
           _this.date.setMonth(_this.date.getMonth()-1);
           _this.show();
		},false);
		$myApi.byId('col_right').addEventListener('click',function(){
           _this.render(_this.date.setMonth(_this.date.getMonth()+1)); 
           _this.show();
		},false);
		$myApi.byId('col_body').addEventListener('click',function(e){
			var e = event || window.event;
			var target = e.target || e.srcElement;
			if (target.nodeName.toLowerCase() == 'td') {
				if (target.innerText) {
					_this.config.dayFn(_this.date.getFullYear()+'-'+(_this.date.getMonth()+1)+'-'+target.innerText);
					_this.input.value=_this.date.getFullYear()+'-'+(_this.date.getMonth()+1)+'-'+target.innerText;
					_this.hide();
				}
			}

		},false);
		this.input.addEventListener('click',function(){
           _this.render(_this.date.setMonth(_this.date.getMonth()+1)); 
           _this.show();
		},false);
		this.input.addEventListener('change',function(){
			if (_this.flag) {
				_this.show();
				_this.flag=false;
			}else{
				_this.hide();
				_this.flag=true;
			}
		},false);
        this.icon.addEventListener('click',function(){
			if (_this.flag) {
				_this.show();
				_this.flag=false;
			}else{
				_this.hide();
				_this.flag=true;
			}
		},false);
        
	},
	is_leap:function(year){
		return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
	},
	destroy:function(){
	}
});