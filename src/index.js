import React from 'react';
import ReactDOM from 'react-dom';
import * as Router from "react-router-dom";
import yaml from "js-yaml";

import "@fortawesome/fontawesome-free/css/all.css";

import Navbar from "./components/Navbar";
import Posts from "./components/Posts";
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
						<div className="item"><Router.NavLink exact to="/">about</Router.NavLink></div>
						<div className="item"><Router.NavLink to="/projects">projects</Router.NavLink></div>
						{
						//<div className="item"><Router.NavLink to="/blog">blog</Router.NavLink></div>
						}
					</Navbar>
				</section>		
				<Router.Switch>
					<Router.Route exact path="/">
						<About data={this.props.data.about}/>
					</Router.Route>		
					<Router.Route path="/projects">
						<section className="section section-projects">
							<div className="container">
								<Posts />
							</div>
						</section>
					</Router.Route>		
					<Router.Route path="/blog">
						<About data={this.props.data.about}/>
					</Router.Route>					
				</Router.Switch>
				<section className="section section-footer">
					<Footer />
				</section>	
			</div>
		);
	}
}

requests.get_about().then((data_yaml)=>{
	const data = yaml.load(data_yaml.data.value);
	ReactDOM.render(
		<Router.HashRouter>
			<App data={{about: data}}/>
		</Router.HashRouter>,
		document.getElementById('root')
	);
});
