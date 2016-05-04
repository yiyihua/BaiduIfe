var photoBox = function  (opt) {
	opt = opt || {};
	var container = opt.container;
	var boxes = document.querySelector(container).querySelectorAll('.photo');

	this.container = document.querySelector(container);

	this.init(boxes.length);

	console.log(this.container);
}

photoBox.prototype = {
	init: function(imageNum) {
		this.container.className += ' photoCon-' +imageNum;
	}

}

// 完全采用了别人的写法  将布局的主题放在了CSS 中  此处只是简单的初始化