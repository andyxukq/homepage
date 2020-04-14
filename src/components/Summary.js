import React from "react";
import "./Summary.sass"

class Summary extends React.Component {
	render() {
		return (
			<div className="Summary container">
				<div className="columns">
					<div className="column">
						<div className="level is-mobile">
							<div className="name level-item">{this.props.name}</div>
							<div className="level-item is-hidden-tablet is-narrow">
								<div className="portrait">
									<img src={this.props.portrait} alt="portrait"/>
								</div>
							</div>
						</div>
						<div className="short-bio" dangerouslySetInnerHTML={{"__html":this.props.short_bio}}></div>
					</div>
					<div className="column is-hidden-mobile is-narrow">
						<div className="portrait">
							<img src={this.props.portrait} alt="portrait"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Summary;