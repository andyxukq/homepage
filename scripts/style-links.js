/**
 * Style enhancements for links:
 * - Wrap .styled-link contents in a span for hover animation
 * - Set target="_blank" on external and /papers links
 */
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.styled-link').forEach(function(link) {
		link.innerHTML = '<span data-content="' + link.innerHTML + '">' + link.innerHTML + '</span>';
	});

	document.querySelectorAll('a').forEach(function(link) {
		const href = link.href || '';
		const isExternal = href.indexOf('kqxu.com') < 0 && href.indexOf('127.0.0.1') < 0 && href.indexOf('/') > 0;
		const isPapers = href.indexOf('/papers') > 0;
		if (isExternal || isPapers) {
			link.setAttribute('target', '_blank');
		}
	});
});
