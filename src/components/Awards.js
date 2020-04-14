import React from "react";

import { SlideDown } from 'react-slidedown'
import "react-slidedown/lib/slidedown.css";

import "./Awards.sass"

class AwardItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showDetail: false };
		this.toggleDetail = this.toggleDetail.bind(this);
	}
	toggleDetail() {
		this.setState({showDetail: !this.state.showDetail});
	}
	render() {
		const data = this.props.data;
		const hasDetail = data.description ? true : false;
		return (
			<div className="AwardItem">
				<div className={"basic"+(hasDetail?" border":"")} onClick={this.toggleDetail}>
					<div className="time">{data.time}</div>
					<div className="program">{data.name}, {data.program}</div>
				</div>		
				{hasDetail &&		
				<SlideDown className="detail" closed={!this.state.showDetail}>
					<div 
						className="description content"
						dangerouslySetInnerHTML={{"__html": data.description}}
					/>
				</SlideDown>
				}
			</div>
		);
	}
}

class Awards extends React.Component {
	render() {
		return (
			<div className="Awards container">
				<div className="section-title">Awards</div>
				{this.props.data.map((r)=>
					<AwardItem key={r.program} data={r} />
				)}
			</div>
		);
	}
}

export default Awards;