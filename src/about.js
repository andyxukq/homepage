import React from 'react';

import Bio from "./components/Bio";


class About extends React.Component {
	render() {
		const data = this.props.data;
		return (
			<>
			<section className="section section-summary">
				<Bio 
					short_bio={data.bio}
					portrait={data.portrait}
				/>			
			</section>
			</>
		);
	}
}

export default About;