import React from "react";
import "./Publications.sass"

class Publications extends React.Component {
	render() {
		return (
			<div className="Publications container">
				<div className="section-title">Selected Publications</div>
				<div className="publication">
					<div className="venue">SIGMOD 2023 - ACM International Conference on Management of Data</div>

					<div className="name">Scalable and Efficient Full-Graph GNN Training for Large Graphs &nbsp;<a className="link" href="https://cse.hkust.edu.hk/~kaichen/papers/g3-sigmod23.pdf" target="_blank"><i className="far fa-file-pdf"></i></a></div>
					<div className="authors">Xinchen Wan﹡, <span className="me">Kaiqiang Xu</span>﹡, Xudong Liao, Yilun Jin, Kai Chen, Xin Jin (﹡Equal Contribution)</div>			
					<div className="brief">New machine learning system designed to optimize parallel GNN training on billion-edge graphs with novel graph partitioning and work pipelining algorithms.</div>
				</div>					
				<div className="publication">
					<div className="venue">Technical Report Preprint - arXiv:2110.01556</div>
					<div className="name">TACC: A Full-stack Cloud Computing Infrastructure for Machine Learning Tasks</div>
					<div className="authors"><span className="me">Kaiqiang Xu</span>, Xinchen Wan, Hao Wang, Zhenghang Ren, Xudong Liao, Decang Sun, Chaoliang Zeng, Kai Chen</div>
					<div className="brief">A complete system design to streamline shared GPU cluster management, addressing challenges in resource allocation, system accessibility and stability.</div>
				</div>				
			</div>
		);
	}
}

export default Publications;