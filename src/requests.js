let profile_data = {
	"bio": "\
		My work speaks to a unique intersection of creating and engineering. After graduating with a Bachelor in Computer Science from Renmin University of China, I served as Chief Operating Officer at <a class='link color-vincross-purple' href='https://nostalgia.vincross.com/en/about' target='_blank'><span data-content='Vincross Robotics'>Vincross Robotics</span></a> (2016-2020), where I led a multinational team to make <a class='link color-vincross-purple' href='https://robots.ieee.org/robots/hexa/' target='_blank'><span data-content='HEXA'>HEXA</span></a> into a world-recognized, iconic robot. I had the honor to be interviewed by top technology and business media outlets, including <a class='link color-vincross-purple' href='https://www.wsj.com/video/events/demo-along-came-a-spider/DF80DAFC-919C-4DD4-AB4B-E2A880A5BD37.html' target='_blank'><span data-content='WSJ'>WSJ</span></a> and <a class='link color-vincross-purple' href='https://spectrum.ieee.org/mind-kit-kickstarter' target='_blank'><span data-content='IEEE'>IEEE</span></a>.\
		<br><br>\
		I enjoy exploring in the domain of arts and humanities. I professionally developed skills in product and user experience design. In my spare time, I dance <a class='link color-tangerine-tango' href='https://www.youtube.com/playlist?list=PLMvB-1EVBfr8_QN_lkhibeZeM8pntIaQY' target='_blank'><span data-content='Argentine Tango'>Argentine Tango</span></a> and have discovered a love for Golden Age Tango Music. Besides hometown Jinan, I have lived in Ann Arbor, Beijing, Berkeley and Hong Kong.\
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