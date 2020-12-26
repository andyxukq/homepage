import React from "react";
//import "./Zoom.sass"
import { LinkStylish } from "./Utils";

class Zoom extends React.Component {
	render() {
		return (
			<div className="Zoom container">
				<div className="columns">
					<div className="column">
						<p>Zoom Meeting ID: 415 818 8788</p>
						<br />
						<p>Click the meeting link to join: <LinkStylish href="https://zoom.us/j/4158188788">https://zoom.us/j/4158188788</LinkStylish></p>
					</div>
				</div>
			</div>
		);
	}
}

export default Zoom;