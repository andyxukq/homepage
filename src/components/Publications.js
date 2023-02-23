import React from "react";
import "./Publications.sass"

class Publications extends React.Component {
	render() {
		let portrait = this.props.portrait[0];
		return (
			<div className="Publications container">
				<div className="section-title">Selected Publications</div>
				<div className="publication">
					<div className="venue">SIGMOD 2023 - ACM Conference on Management of Data</div>
					<div className="name">Scalable and Efficient Full-Graph GNN Training for Large Graphs</div>
					<div className="authors">Xinchen Wan﹡, <span className="me">Kaiqiang Xu</span>﹡, Xudong Liao, Yilun Jin, Kai Chen, Xin Jin (﹡Equal Contribution)</div>
				</div>					
				<div className="publication">
					<div className="venue">Technical Report</div>
					<div className="name">TACC: A Full-stack Cloud Computing Infrastructure for Machine Learning Tasks</div>
					<div className="authors"><span className="me">Kaiqiang Xu</span>, Xinchen Wan, Hao Wang, Zhenghang Ren, Xudong Liao, Decang Sun, Chaoliang Zeng, Kai Chen</div>
				</div>				
			</div>
		);
	}
}

export default Publications;