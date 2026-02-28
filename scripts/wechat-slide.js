(function () {
	function init() {
		var el = document.getElementById('wechatContact');
		if (!el) return;
		el.addEventListener('click', function (e) {
			if (e.target.closest('.icon-wechat')) {
				el.classList.toggle('open');
			}
		});
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
