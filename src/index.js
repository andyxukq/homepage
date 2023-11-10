import React from 'react';
import ReactDOM from 'react-dom';

import "@fortawesome/fontawesome-free/css/all.css";

import Navbar from "./components/Navbar";
import Publications from "./components/Publications";
import Bio from "./components/Bio";
import Footer from "./components/Footer";
import * as requests from "./requests";

import "./index.sass";

class App extends React.Component {
	render() {
		let pathname = window.location.pathname;
		let data = this.props.data;

		return (
			<div className="App">
				<section className="section section-navbar">
					<Navbar>
						<div className="item"><span className="active">{data.name}</span></div>
					</Navbar>
				</section>		
				<section className="section section-content">
					<Bio 
						short_bio={data.bio}
						portrait={data.portrait}
					/>	
				</section>				
				<section className="section section-footer">
					<Footer />
				</section>	
			</div>
		);
	}
}

function addMetaTag(name, content) {
	var meta = document.createElement('meta');
	meta.name = name;
	meta.content = content.replace(/(<([^>]+)>)/ig, "");
	document.getElementsByTagName('head')[0].appendChild(meta);
}

requests.get_about().then((data)=>{
	addMetaTag("description", data.bio);
	addMetaTag("author", "Kaiqiang Xu");
	addMetaTag("keywords", "Kaiqiang Xu, 徐凯强, Andy Xu");
	ReactDOM.render(
		<App data={data}/>,
		document.getElementById('root')
	);
});
