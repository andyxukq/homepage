import React from "react";

import "./Education.sass"

class EducationItem extends React.Component {
	render() {
		const data = this.props.data;
		return (
			<div className="EducationItem">
				<div className="basic">
					<div className="degree">{data.degree}</div>
					<div className="school">{data.school}</div>
				</div>
			</div>
		);
	}
}

class Education extends React.Component {
	render() {
		return (
			<div className="Education container">
				<div className="section-title">Education</div>
				{this.props.data.map((r)=>
					<EducationItem key={r.school} data={r} />
				)}
			</div>
		);
	}
}

export default Education;