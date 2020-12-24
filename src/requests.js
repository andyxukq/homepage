let profile_data = {
	"bio": "\
		Kaiqiang’s work speaks to his unique intersection of creating and engineering. After graduating with a Bachelor of Computer Science from Renmin University of China, Kaiqiang served as Chief Operating Officer at <a class='link color-vincross-purple' href='https://www.vincross.com/en/about' target='_blank'><span data-content='Vincross Robotics'>Vincross Robotics</span></a> from 2016 to 2020, where he led a multinational team to make <a class='link color-vincross-purple' href='https://robots.ieee.org/robots/hexa/' target='_blank'><span data-content='HEXA'>HEXA</span></a> into a world-recognized, iconic robot. Kaiqiang was interviewed by top technology and business medias, including WSJ and IEEE.\
		<br><br>\
		While having a background in computer science and mathematics, Kaiqiang enjoys exploring in the domain of arts and humanities. Kaiqiang has professionally developed skills in product and user experience design. Kaiqiang dances <a class='link color-tangerine-tango' href='https://www.youtube.com/playlist?list=PLMvB-1EVBfr8_QN_lkhibeZeM8pntIaQY' target='_blank'><span data-content='Argentine Tango'>Argentine Tango</span></a> and discovered a love for Golden Age Tango Music. Besides hometown Jinan, Kaiqiang has lived in Ann Arbor, Beijing, Berkeley and Hong Kong.\
		",
	"name": "Kaiqiang Xu",
	"portrait": [{
		"path": "/portraits/jinan0.jpg",
		"caption": ""
	}]
};

export function get_about() {
	return new Promise(r=>r(profile_data));
}