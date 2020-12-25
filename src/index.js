import React from 'react';
import ReactDOM from 'react-dom';
import * as Router from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./about";
import * as requests from "./requests";

import "./index.sass";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<section className="section section-navbar">
					<Navbar>
						<div className="item"><a className="active">About {this.props.data.name}</a></div>
					</Navbar>
				</section>		
				<About data={this.props.data}/>
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
