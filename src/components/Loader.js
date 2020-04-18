/** @jsx jsx */
import React from "react";
import { css, jsx } from "@emotion/core";
import Skeleton from 'react-loading-skeleton';


class Loader extends React.Component {
	render() {
		const loaderStyle = css`
			.react-loading-skeleton {
				border-radius: 0;
			}
		`;
		const count = this.props.count || 1;
		return (
			<span ref={this.props.innerRef} css={loaderStyle}>
				<Skeleton duration={5} count={count}/>
			</span>
		)
	}
}

export default Loader;