import React from "react";

export class Link extends React.Component {
	render() {
		return (
			<a href={this.props.href} target="_blank" rel="noopener noreferrer">{this.props.children}</a>
		);
	}
}

export class LinkStylish extends React.Component {
	render() {
		return (
			<a className={"link " + this.props.color} href={this.props.href} target="_blank" rel="noopener noreferrer">
				<span data-content={this.props.children}>
					{this.props.children}
				</span>
			</a>
		);
	}
}
