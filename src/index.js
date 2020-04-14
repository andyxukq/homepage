import React from 'react';
import ReactDOM from 'react-dom';
import yaml from "js-yaml";

import Divider from "./components/Divider";
import Summary from "./components/Summary";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Awards from "./components/Awards";

import "./index.sass";

class App extends React.Component {
	render() {
		const {personal, experience, education, awards} = this.props.data;
		return (
			<div className="App">
				<section className="section">
					<Summary 
						name={personal.name} 
						short_bio={personal.about}
						portrait={personal.portrait}
					/>
					<Divider drawLine={true}/>
					<Experience data={experience}/>
					<Divider />
					<Education data={education}/>
					<Divider />
					<Awards data={awards}/>
					<Divider />					
				</section>
			</div>
		);
	}
}

let URL_PREFIX = "https://page.andyxu.xyz/";
if (!window.location.href.includes(":")) {
	//URL_PREFIX = "./";
}
fetch(URL_PREFIX+"data.yaml").then((r) => r.text()).then((data_yaml)=>{
	const data = yaml.load(data_yaml);
	ReactDOM.render(
		<React.StrictMode>
			<App data={data}/>
		</React.StrictMode>,
		document.getElementById('root')
	);
});

