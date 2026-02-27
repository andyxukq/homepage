/**
 * Redirect Chinese locale users to the Chinese site.
 * Skips redirect when path is /zh or hash is #en.
 */
(function() {
	const userLanguage = navigator.language || navigator.userLanguage;
	const lang = userLanguage.split('-')[0];

	const path = window.location.pathname;
	const hash = window.location.hash;

	if (path === '/zh.html' || path.endsWith('/zh') || hash === '#en') return;
	if (lang.startsWith('zh')) {
		window.location.href = '/zh';
	}
})();
