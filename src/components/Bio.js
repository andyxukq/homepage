import React from "react";
import "./Bio.sass"

class Bio extends React.Component {
	render() {
		let portrait = this.props.portrait[0];
		return (
			<div className="Bio container">
				<div className="columns">
					<div className="column">
						<div className="short-bio" dangerouslySetInnerHTML={{"__html":this.props.short_bio}}></div>
					</div>
					<div className="column is-narrow">
						<div className="portrait">
							<img src={portrait.path} alt="portrait"/>
							<p className="caption">{portrait.caption}</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Bio;