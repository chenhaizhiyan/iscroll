
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
				this._pullRefreshStart(e);
				this._start(e);

			break;
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);

				break;
			case 'touchmove':
				this._pullRefreshMove(e);
				this._move(e);

				break;
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
				this._pullRefreshEnd(e);
				this._end(e);
				break;
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( this.enabled && !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};