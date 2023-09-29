let profile_data = {
	"bio": "\
		My work seeks the convergence of technology and creativity. \
		I received a BSc in Computer Science from Renmin University of China in 2016. \
		I worked as COO at <a class='link color-vincross-purple' href='https://nostalgia.vincross.com/en/about' target='_blank'><span data-content='Vincross Robotics'>Vincross Robotics</span></a> from 2016 to 2020, where I led a global team to make <a class='link color-vincross-purple' href='https://robots.ieee.org/robots/hexa/' target='_blank'><span data-content='HEXA'>HEXA</span></a> a world-recognized robot, and was interviewed by <a class='link color-vincross-purple' href='https://www.wsj.com/video/events/demo-along-came-a-spider/DF80DAFC-919C-4DD4-AB4B-E2A880A5BD37.html' target='_blank'><span data-content='WSJ'>WSJ</span></a> and <a class='link color-vincross-purple' href='https://spectrum.ieee.org/mind-kit-kickstarter' target='_blank'><span data-content='IEEE'>IEEE</span></a>.\
		<br><br>\
		Outside of work, I enjoy art and music whenever I can. \
		I dance <a class='link color-tangerine-tango' href='https://www.youtube.com/playlist?list=PLMvB-1EVBfr8_QN_lkhibeZeM8pntIaQY' target='_blank'><span data-content='Argentine Tango'>Argentine Tango</span></a> and have a love for Golden Age Tango Music. \
		My favorite artist is Edward Hopper for his <a class='link color-tangerine-tango' href='https://www.artic.edu/articles/808/nighthawks-as-a-symbol-of-hope' target='_blank'><span data-content='Nightawks (1942)'>Nightawks (1942)</span></a> and more. \
		I recommend the timeless musical <a class='link color-tangerine-tango' href='https://www.youtube.com/watch?v=_bGIaYDLftU' target='_blank'><span data-content='Les Misérables'>Les Misérables</span></a> to everyone.\
		Besides my hometown Jinan, I called Ann Arbor, Beijing, Berkeley and Hong Kong home.\
		",
	"name": "Kaiqiang Xu 徐凯强",
	"portrait": [{
		"path": "/portraits/2023-2.jpg",
		"caption": ""
	}]
};

export function get_about() {
	return new Promise(r=>r(profile_data));
}