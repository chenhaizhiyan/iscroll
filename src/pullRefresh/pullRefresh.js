
	_initPullRefresh: function () {
		// var el = this.options.pullRefresh;

    this.pullingText = this.options.pullingText || '下拉即可刷新...';
    this.loosingText = this.options.loosingText || '释放即可刷新...';
    this.loadingText = this.options.loadingText || '加载中...';
    this.animationDuration = this.options.animationDuration || 300;
    this.headHeight = this.options.headHeight || 50;
    this.pullDistance = this.options.pullDistance || 50;
    this.startY = 0;
    this.timeouter = null;
    this.moveDistance = 0;

    this.createTip();

		this.on('refresh', function () {
      this.timeouter = null;
      this.moveDistance = 0;
      this.tip.innerText = this.pullingText;
      this.tip.style.display = 'none';
    });
	},

  createTip: function () {
    var className = 'pull-refresh';
    this.tip = this.wrapper.querySelector('.' + className);
    if (this.tip === null) {
      this.tip = document.createElement('div');
      this.tip.setAttribute('class', className);
      this.tip.style.lineHeight = this.headHeight + 'px';
      this.tip.style.height = this.headHeight + 'px';
      this.tip.style.textAlign = 'center';
      this.tip.innerText = this.pullingText;
      this.tip.style.display = 'none';
      this.wrapper.prepend(this.tip);
    }
  },

  _pullRefreshStart: function (e) {
    if ( !this.options.pullRefresh || e.touches.length > 1 || this.y < -10 ) return;
    this.startY = e.touches[0].clientY;
  },

  _pullRefreshMove: function (e) {
    if ( !this.options.pullRefresh || e.touches.length > 1 || this.y < -10 ) return;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //首先判断我们有没有滚动条，如果有，我们下拉刷新就不能启用。
    if (scrollTop > 0) return;
    
    this.moveDistance = e.touches[0].clientY - this.startY;
      //判断手指滑动的距离，只有为正数才代表用户下拉了。
    if (this.moveDistance > this.pullDistance) {
      //阻止默认事件，在微信浏览器中尤为有用，至于为什么，你去试就知道了。
      e.preventDefault();
      //增加滑动阻力的感觉
      this.tip.style.display = 'block';
      this.tip.innerText = this.loosingText;
    }

  },

  _pullRefreshEnd: function (e) {
    if ( !this.options.pullRefresh || e.touches.length > 1 || this.y < -10 ) return;
    if (this.moveDistance > this.pullDistance) {
      var _this = this;
      this.tip.innerText = this.loadingText;
      this.timeouter = setTimeout(function () {
        _this.refresh();
      }, this.animationDuration);
    } else {
      this.tip.style.display = 'none';
    }
  },

