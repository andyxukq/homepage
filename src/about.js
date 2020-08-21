import React from 'react';

import Divider from "./components/Divider";

import Summary from "./components/about/Summary";
import Experience from "./components/about/Experience";
import Education from "./components/about/Education";
import Awards from "./components/about/Awards";

import portrait from "./resources/portrait.jpg";
import portrait_webp from "./resources/portrait.webp";

class About extends React.Component {
	render() {
		const {personal, experience, education, awards} = this.props.data;
		return (
			<>
			<section className="section section-summary">
				<Summary 
					name={personal.name}
					name_chinese={personal.name_chinese}
					short_bio={personal.about}
					portrait={personal.portrait}
				/>
				<Divider />
				<Experience data={experience}/>
				<Divider />
				<Education data={education}/>
				<Divider />
				<Awards data={awards}/>
				<Divider />					
			</section>
			</>
		);
	}
}

export default About;