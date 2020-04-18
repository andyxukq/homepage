import React from "react";
import { SlideDown } from 'react-slidedown'
import "react-slidedown/lib/slidedown.css";

import "./Experience.sass"

class ExperienceItem extends React.Component {
	constructor(props) {
		super(props);
		const isMobile = window.innerWidth < 768;
		this.state = { showDetail: !isMobile && this.props.index===0 };
		this.toggleDetail = this.toggleDetail.bind(this);
	}
	toggleDetail() {
		this.setState({showDetail: !this.state.showDetail});
	}
	render() {
		const data = this.props.data;
		
		return (
			<div className="ExperienceItem">
				<div className="basic" onClick={this.toggleDetail}>
					<div className="dates">{data.time} · {data.location}</div>
					<div className="job-title">{data.title}, {data.company}</div>
				</div>
				<SlideDown className="detail" closed={!this.state.showDetail} transitionOnAppear={false}>
					{data.description_sections && data.description_sections.map((r, index)=>(
						<div key={index} className="description content">
							<p>{r.title}</p>
							<ul>
								{r.list.map((l, index)=>(
									<li key={index} dangerouslySetInnerHTML={{"__html":l}}></li>
								))}
							</ul>
						</div>
					))}				
					{data.descriptions && (
						<div className="description content">
							<ul>
								{data.descriptions.map((l, index)=>(
									<li key={index} dangerouslySetInnerHTML={{"__html":l}}></li>
								))}
							</ul>
						</div>
					)}
				</SlideDown>
			</div>
		);
	}
}

class Experience extends React.Component {
	render() {
		return (
			<div className="Experience container">
				<div className="section-title">Experience</div>
				{this.props.data.map((r, index)=>
					<ExperienceItem key={r.company} data={r} index={index} />
				)}
			</div>
		);
	}
}

export default Experience;