import React from "react";

import "./Navbar.sass";

class Navbar extends React.Component {
	render() {
		return (
			<div className="Navbar">
				<div className="container">
					<div className="row">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;