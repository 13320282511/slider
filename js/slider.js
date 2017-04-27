/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-13 20:04:08
 * @version $Id$
 */

 ;(function($){
 	var Slider = function(config){
 		this.options = {

 		};
 		this.wrap = config.dom;
 		this.list = config.list; 
 		//构造三部曲
 		this.init();
 		this.renderDOM();
 		this.bindDOM();
 		var tt;
 		
 	};

 	Slider.prototype = {
 		init : function(){
 			//算出窗口长宽比
 			this.radio = window.innerHeight/window.innerWidth;
 			this.scaleW = window.innerWidth;
 			//当前图片索引
 			this.idx = 0;
 		},
 		renderDOM : function(){
 			var wrap = this.wrap;
 			var data = this.list;
 			var len = data.length;
 			var scale = this.scaleW;
 			this.outer = document.createElement("ul");
 			for(var i = 0;i<len;i++){
 				var li = document.createElement('li');
 				var item = data[i];
 				li.style.width = scale +'px';
 				li.style.webkitTransform = 'translate3d('+i*scale+'px,0,0)';
 				if(item){
 					if(item['height']/item['width']>this.radio){
 						li.innerHTML = '<img height="'+ window.innerHeight+'" src=" ' +item.img +'"/>';

 					}else{
 						li.innerHTML = '<img width="'+ window.innerWidth+'" src=" ' +item.img +'"/>';
 					}
 				}
 				this.outer.appendChild(li);
 			}	

 			this.outer.style.width = scale+'px';
 			
 			wrap.style.height = window.innerHeight+'px';
 			wrap.appendChild(this.outer);
 		},
 		bindDOM : function(){
 			var self = this;
 			var scale = self.scaleW;
 			var outer = self.outer;
 			var len = self.list.length;
 			var startHandler = function(evt){
 				self.startX = evt.touches[0].pageX;
 				self.offsetX = 0;
 				self.startTime = new Date()*1;
 			};
 			var moveHandler = function(evt){

 				evt.preventDefault();
 				self.offsetX = evt.targetTouches[0].pageX - self.startX;
 				var lis = outer.getElementsByTagName('li');
 				var i = self.idx - 1;
 				var m = i + 3;
 				for(i;i<m;i++){
 					//lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
 					lis[i] && (lis[i].style.webkitTransition = '-webkit-transform 0s ease-out');
  					lis[i] && (lis[i].style.webkitTransform='translate3d('+((i-self.idx)*self.scaleW + self.offsetX) + 'px,0,0)');
 					//lis[i] && (lis[i].style.webkitTransform = 'translate3d('+ ((i-self.idx)*self.scaleW + self.offsetX) +'px, 0, 0)');
 				}
 			};
 			var endHandler = function(evt){
 				var boundary = scale/6;
 				var endTime = new Date()*1;
 				var lis = outer.getElementsByTagName('li');
 				if(endTime - self.startTime >800 ){
 					if(self.offsetX >= boundary){
	 					//进入下一页
	 					self.goIndex('-1');

	 				}else if(self.offsetX < -boundary){
	 					//进入下一页
	 					self.goIndex('+1');
	 				}else{
	 					//留在本页
	 					self.goIndex('0');

	 				}
	 			}else{
	 				//快操作
	 				//优化
	 				if(self.offsetX > 50){
	 					self.goIndex('-1');

	 				}else if(self.offsetX < -50){
	 					self.goIndex('+1');
	 				}else{
	 					self.goIndex('0');
	 				}
	 			}
 			};
 			outer.addEventListener('touchstart',startHandler);
 			outer.addEventListener('touchmove',moveHandler);
 			outer.addEventListener('touchend',endHandler);
 		},
 		goIndex : function(n){
 			var idx = this.idx;
 			var cidx;
 			var lis = this.outer.getElementsByTagName('li');
 			var len = lis.length;
 			var scale = this.scaleW;
 			if(typeof n == 'number'){
 				cidx = idx;
 			}else if(typeof n == 'string'){
 				cidx = idx + n*1;
 			}

 			//当索引从右边超出
 			if(cidx > len -1){
 				cidx = len - 1;

 			//当索引从左边超出
 			}else if(cidx < 0){
 				cidx = 0;
 			}

 			this.idx = cidx;

 			lis[cidx].style.webkitTransition = '-webkit-transform 0.2s ease-out';
 			lis[cidx-1] && (lis[cidx-1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
 			lis[cidx+1] && (lis[cidx+1].style.webkitTransition = '-webkit-transform 0.2s ease-out');
 			lis[cidx].style.webkitTransform = 'translate3d(0,0,0)';
 			lis[cidx-1] && (lis[cidx-1].style.webkitTransform = 'translate3d(-' + scale + 'px,0,0)');
 			lis[cidx+1] && (lis[cidx+1].style.webkitTransform = 'translate3d('+scale+'px,0,0)');
 		}
 	};
 	
 	$.slider = function(config){
 		return new Slider(config);
 	}

 })(Zepto);

