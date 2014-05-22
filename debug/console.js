define(function() {
	/**
	 * 给日期原型加上toString
	 */
	Date.prototype.toString = function() {
		var args = {
		    "d" : 'getDate',
		    "h" : 'getHours',
		    "m" : 'getMinutes',
		    "s" : 'getSeconds'
		}, rDate = /(yy|M|d|h|m|s)\1?/g, toString = Date.prototype.toString;

		return function(format) {
			var me = this;

			if (!format)
				return toString.call(me);

			return format.replace(rDate, function replace(key, reg) {
				var l = key != reg, t;
				switch (reg) {
				case 'yy':
					t = me.getFullYear();
					return l && t || (t % 100);
				case 'M':
					t = me.getMonth() + 1;
					break;
				default:
					t = me[args[reg]]();
				}
				return l && t <= 9 && ("0" + t) || t;
			});
		}
	}()
	//
	function Console() {
		var self = this;
		// 外围wrapper
		var dom = document.createElement('div');
		document.body.appendChild(dom);
		var domStyle = {
		    'background' : '#000',
		    'position' : 'fixed',
		    'top' : 0,
		    'left' : 0,
		    'color' : '#fff',
		    'width' : '90%',
		    'height' : '90%',
		    'z-index' : 9999999,
		    'font-size' : '12px',
		    'line-height' : '18px',
		    'text-align' : 'left'
		}
		for ( var p in domStyle) {
			dom.style[p] = domStyle[p]
		}
		// 最小化bar
		var bar = document.createElement('div');
		document.body.appendChild(bar);
		var barStyle = {
		    'background' : '#000',
		    'position' : 'fixed',
		    'top' : 0,
		    'left' : 0,
		    'color' : '#fff',
		    'width' : '50%',
		    'min-height' : '36px',
		    'max-height' : '30%',
		    'overflow' : 'hidden',
		    'z-index' : 9999999,
		    'font-size' : '12px',
		    'line-height' : '18px',
		    'word-wrap' : 'break-word'
		}
		for ( var p in barStyle) {
			bar.style[p] = barStyle[p]
		}
		dom.style.display = 'none';
		bar.innerHTML = '<div style="line-height: 36px;text-align: center">DEBUG</div>';
		self.fullView = false;
		bar.addEventListener('click', function() {
			if (self.fullView == false) {
				bar.style.display = 'none';
				self.fullView = true;
				dom.style.display = 'block';
				logDom.childNodes[logDom.childNodes.length - 1].scrollIntoView();
			}
		}, false);
		self.barCanMove = false;
		bar.addEventListener('touchstart', function(e) {
			e.preventDefault();
			self.timeoutBarCanMove = setTimeout(function() {
				self.timeoutBarCanMove = null;
				self.bar.style.opacity = 0.5;
				self.barCanMove = true;
			}, 500);
			self.touchStartInitPos = {
			    x : e.touches[0].clientX,
			    y : e.touches[0].clientY
			}
		}, false);
		bar.addEventListener('touchmove', function(e) {
			e.preventDefault();
			self.touchMoveLastPos = self.touchMoveLastPos || self.touchStartInitPos;
			if (self.timeoutBarCanMove) {
				clearTimeout(self.timeoutBarCanMove);
				self.timeoutBarCanMove = null;
			} else {
				if (self.barCanMove) {
					var nowPos = {
					    x : e.touches[0].clientX,
					    y : e.touches[0].clientY
					}
					var move = {
					    x : nowPos.x - self.touchMoveLastPos.x,
					    y : nowPos.y - self.touchMoveLastPos.y,
					}
					var fixedPosStyle = {
					    left : parseInt(bar.style.left) + move.x,
					    top : parseInt(bar.style.top) + move.y
					}
					if (fixedPosStyle.left >= 0 && fixedPosStyle.left + bar.offsetWidth <= window.innerWidth) {
						bar.style.left = fixedPosStyle.left + 'px';
					}
					if (fixedPosStyle.top >= 0 && fixedPosStyle.top + bar.offsetHeight <= window.innerHeight) {
						bar.style.top = fixedPosStyle.top + 'px';
					}
				}
			}
			self.touchMoveLastPos = {
			    x : e.touches[0].clientX,
			    y : e.touches[0].clientY
			}
		}, false);
		bar.addEventListener('touchend', function(e) {
			if (self.timeoutBarCanMove) {
				clearTimeout(self.timeoutBarCanMove);
				self.timeoutBarCanMove = null;
			}
			self.bar.style.opacity = 1;
			self.barCanMove = false;
			self.touchMoveLastPos = self.touchStartInitPos = null;
		});
		// 日志列表区
		var logDom = document.createElement('div');
		logDom.className = 'J_logDom';
		var logDomStyle = {
		    'height' : '100%',
		    'margin-bottom' : '36px',
		    'overflow-y' : 'scroll',
		    'word-wrap' : 'break-word'
		}
		for ( var p in logDomStyle) {
			logDom.style[p] = logDomStyle[p]
		}
		dom.appendChild(logDom);
		// 按钮区
		var btnsDom = document.createElement('div');
		btnsDom.className = 'J_btnsDom';
		var btnsDomStyle = {
		    'height' : '36px',
		    'position' : 'absolute',
		    'width' : '100%',
		    'background-color' : 'orange',
		    'overflow-x' : 'auto',
		    'bottom' : '-36px',
		    'clear' : 'both'
		}
		for ( var p in btnsDomStyle) {
			btnsDom.style[p] = btnsDomStyle[p]
		}
		dom.appendChild(btnsDom);
		var btnsConfig = [ {
		    name : '关闭',
		    className : 'J_btn_close',
		    fn : function() {
			    bar.style.display = 'block';
			    dom.style.display = 'none';
			    self.fullView = false;
		    }
		}, {
		    name : 'LOG',
		    className : 'J_btn_log',
		    fn : function() {
			    self.switchLogType('log');
		    }
		}, {
		    name : 'DEBUG',
		    className : 'J_btn_debug',
		    fn : function() {
			    self.switchLogType('debug');
		    }
		}, {
		    name : 'WARN',
		    className : 'J_btn_warn',
		    fn : function() {
			    self.switchLogType('warn');
		    }
		}, {
		    name : 'ERROR',
		    className : 'J_btn_error',
		    fn : function() {
			    self.switchLogType('error');
		    }
		}, {
		    name : 'ALL',
		    className : 'J_btn_all',
		    style : {
		        'background-color' : '#fff',
		        'color' : '#000'
		    },
		    fn : function() {
			    self.switchLogType('all');
		    }
		} ];
		btnsConfig.forEach(function(o) {
			var btn = document.createElement('div');
			var style = {
			    'display' : 'inline-block',
			    'line-height' : '36px',
			    'padding' : '0px 3px',
			    'color' : '#fff'
			}
			for ( var p in style) {
				btn.style[p] = style[p];
			}
			btn.addEventListener('click', o.fn, false);
			if (o.className) {
				btn.className = o.className;
			}
			if (o.style) {
				for ( var p in o.style) {
					btn.style[p] = o.style[p];
				}
			}
			btn.innerHTML = o.name;
			btnsDom.appendChild(btn);
		})
		// 存储区
		this.memory = [];
		this.memory.push = function(o) {
			Array.prototype.push.apply(this, arguments);
			var tips = document.createElement('div');
			tips.innerHTML = [ '[' + o.date.toString('yyyy-MM-dd hh:mm:ss') + ']', '[' + o.type + ']', o.msg ].join(' ');
			var tipsColor = 'white';
			switch (o.type) {
			case 'debug':
				tipsColor = 'yellow';
				break;
			case 'warn':
				tipsColor = 'orange';
				break;
			case 'error':
				tipsColor = 'red';
				break;
			}
			tips.style.color = tipsColor;
			logDom.appendChild(tips);
			self.updateBar('<div style="text-align:left;color:' + tipsColor + '">' + o.msg + '</div>');
			tips.scrollIntoView();
		}
		this.dom = dom;
		this.bar = bar;
		this.logDom = logDom;
		this.btnsDom = btnsDom;
		this.GLOBAL_SCOPE = new Function('return this')();
		this.sysConsole = this.GLOBAL_SCOPE.console;
	}
	Console.prototype = {
	    _stringify : function(o) {
		    var out;
		    if (o != null) {
			    out = '{';
			    var i = 0;
			    for ( var p in o) {
				    if (i > 0) {
					    out += ','
				    }
				    out += '"' + p + '":'
				    try {
					    out += JSON.stringify(o[p]);
				    } catch (e) {
					    try {
						    out += '"' + o[p].toString() + '"'
					    } catch (e1) {
						    out += '"[Object]"'
					    }
				    }
				    i++;
			    }
			    out += '}';
		    } else {
			    out = 'null';
		    }
		    return out;
	    },
	    _translateLog : function(o) {
		    var msg;
		    if (typeof (o) == 'object') {
			    try {
				    msg = this._stringify(o);
			    } catch (e) {
				    msg = o.toString();
			    }
		    } else {
			    var i = 0;
			    var args = arguments;
			    msg = typeof (o) == 'string' ? arguments[0].replace(/(%s|%d|%i|%f|%o)/ig, function(o) {
				    i++;
				    var re = args[i];
				    //
				    return re;
			    }) : o;
		    }
		    return msg;
	    },
	    log : function() {
		    var msg = this._translateLog.apply(this, arguments);
		    var sysConsole = this.sysConsole;
		    sysConsole && sysConsole.log.apply(sysConsole, arguments);
		    this.memory.push({
		        type : 'log',
		        msg : msg,
		        date : new Date()
		    })
	    },
	    warn : function() {
		    var msg = this._translateLog.apply(this, arguments);
		    var sysConsole = this.sysConsole;
		    sysConsole && sysConsole.warn.apply(sysConsole, arguments);
		    this.memory.push({
		        type : 'warn',
		        msg : msg,
		        date : new Date()
		    })
	    },
	    debug : function() {
		    var msg = this._translateLog.apply(this, arguments);
		    var sysConsole = this.sysConsole;
		    sysConsole && sysConsole.debug.apply(sysConsole, arguments);
		    this.memory.push({
		        type : 'debug',
		        msg : msg,
		        date : new Date()
		    })
	    },
	    error : function() {
		    var msg = this._translateLog.apply(this, arguments);
		    var sysConsole = this.sysConsole;
		    sysConsole && sysConsole.error.apply(sysConsole, arguments);
		    this.memory.push({
		        type : 'error',
		        msg : msg,
		        date : new Date()
		    })
	    },
	    updateBar : function(msg) {
		    this.bar.innerHTML = msg;
	    },
	    switchLogType : function(type) {
		    var self = this;
		    Array.prototype.forEach.call(self.logDom.childNodes, function(el) {
			    if (type != 'all') {
				    if (el.innerHTML.indexOf('[' + type + ']') > 0) {
					    el.style.display = 'block';
				    } else {
					    el.style.display = 'none';
				    }
			    } else {
				    el.style.display = 'block';
			    }
		    });
		    Array.prototype.forEach.call(self.btnsDom.childNodes, function(el) {
			    var resetStyle = {
			        'background-color' : 'inherit',
			        'color' : 'inherit'
			    }
			    var choseStyle = {
			        'background-color' : '#fff',
			        'color' : '#000'
			    }
			    for ( var p in resetStyle) {
				    el.style[p] = resetStyle[p];
			    }
			    if (new RegExp(type, 'i').test(el.innerHTML)) {
				    for ( var p in choseStyle) {
					    el.style[p] = choseStyle[p];
				    }
			    }
		    });
	    }
	}
	var console = new Console();

	return console;
})