// var Popup=(function(){ //原生封装
//     var open=function(config){
//     };
//     open.prototype={
//         init:function(config){ //初始化
//         	this.config=config;
//             return this;
//         },
//         _createFloater:function(html){ //创建弹出层
//             var newDiv = document.createElement("div");
//             var head=document.createElement("h3");
//             var btn_yes=document.createElement("button");
//             var btn_no=document.createElement("button");
//             var nDivStyle=newDiv.style;
//             head.style.cssText='color: white;background-color: green;padding: 5px;text-align: center;';
//             head.innerText=this.config.header;
//             btn_yes.id=this.config.yesId;
//             btn_yes.innerText='确定';
//             btn_no.id=this.config.noId;
//             btn_no.innerText='取消';
//             newDiv.id = this.id;
//             nDivStyle.cssText='position: fixed;z-index: 9999;background-color: white;border:1px black solid;display: none;';
//             nDivStyle.width=this.config.width+'px';
//             nDivStyle.height=this.config.height+'px';
//             nDivStyle.left=(document.body.clientWidth/2-this.config.width/2)+'px';
//             nDivStyle.top=(document.documentElement.clientHeight/2-this.config.height/2)+'px';
//             newDiv.appendChild(head);
//             newDiv.innerHTML+=html;
//             newDiv.appendChild(btn_yes);
//             newDiv.appendChild(btn_no);
//             document.body.appendChild(newDiv);
//             this._floater = newDiv;
//         },
//         _createCover:function() { //创建遮罩层
//             var newMask = document.createElement("div");
//             var maskStyle=newMask.style;
//             newMask.id ='cover';
//             maskStyle.cssText='position: fixed;z-index: 9000;width:100%;background-color:#000;left:0px;top:0px;display:none; filter:alpha(opacity=50);opacity:0.5;';
//             maskStyle.height =document.body.clientHeight+"px";
//             document.body.appendChild(newMask);
//             this._cover = newMask;
//         },
//         show: function(html){
//             if(!this._cover){
//                this._createCover();
//             }
//             if(!this._floater){
//                 this._createFloater(html);
//             }
//             this._floater.style.display='block';
//             this._cover.style.display='block';
//             this._bind(this.config.yesId,this.config.yesFn);
//             this._bind(this.config.noId,this.config.noFn);
//         },
//         hide:function(){
//             this.isShow=false;
//             if(this._floater){
//                 document.body.removeChild(this._floater);
// 	    	}
// 	    	if(this._cover){
//                 document.body.removeChild(this._cover);
// 	    	}
// 	    	this._cover=null;
// 	    	this._floater=null;
//         },
//         _bind:function(id,fn){
//             document.getElementById(id).addEventListener('click',fn
//             ,false);
// 	       }
//     }
//     return open;
// })();
var Popup = Class.extend({ //class 封装
	init: function(config) { //初始化
		this.config = config;
		return this;
	},
	_createFloater: function(html) { //创建弹出层
		var newDiv = document.createElement("div");
		var head = document.createElement("h3");
		var btn_yes = document.createElement("button");
		var btn_no = document.createElement("button");
		var nDivStyle = newDiv.style;
		head.style.cssText = 'color: white;background-color: green;padding: 5px;text-align: center;';
		head.innerText = this.config.header;
		btn_yes.id = this.config.yesId;
		btn_yes.innerText = '确定';
		btn_no.id = this.config.noId;
		btn_no.innerText = '取消';
		newDiv.id = this.id;
		nDivStyle.cssText = 'position: fixed;z-index: 9999;background-color: white;border:1px black solid;display: none;';
		nDivStyle.width = this.config.width + 'px';
		nDivStyle.height = this.config.height + 'px';
		nDivStyle.left = (document.body.clientWidth / 2 - this.config.width / 2) + 'px';
		nDivStyle.top = (document.documentElement.clientHeight / 2 - this.config.height / 2) + 'px';
		newDiv.appendChild(head);
		newDiv.innerHTML += html;
		newDiv.appendChild(btn_yes);
		newDiv.appendChild(btn_no);
		document.body.appendChild(newDiv);
		this._floater = newDiv;
	},
	_createCover: function() { //创建遮罩层
		var newMask = document.createElement("div");
		var maskStyle = newMask.style;
		newMask.id = 'cover';
		maskStyle.cssText = 'position: fixed;z-index: 9000;width:100%;background-color:#000;left:0px;top:0px;display:none; filter:alpha(opacity=50);opacity:0.5;';
		maskStyle.height = document.body.clientHeight + "px";
		document.body.appendChild(newMask);
		this._cover = newMask;
	},
	render: function(html) {
		if (!this._cover) {
			this._createCover();
		}
		if (!this._floater) {
			this._createFloater(html);
		}
		this._floater.style.display = 'block';
		this._cover.style.display = 'block';
		this._bind(this.config.yesId, this.config.yesFn);
		this._bind(this.config.noId, this.config.noFn);
	},
	destroy: function() {
		this.isShow = false;
		if (this._floater) {
			document.body.removeChild(this._floater);
		}
		if (this._cover) {
			document.body.removeChild(this._cover);
		}
		this._cover = null;
		this._floater = null;
	},
	_bind: function(id, fn) {
		document.getElementById(id).addEventListener('click', fn, false);
	}
});