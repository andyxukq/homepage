import React from "react";
import "./Divider.sass"

class Divider extends React.Component {
	render() {
		const draw = this.props.drawLine;
		return (
			<div className="container">
				<div className={"Divider"+(draw?" border":"")}></div>
			</div>
		);
	}
}

export default Divider;