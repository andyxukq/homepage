import React from "react";
import ReactTooltip from "react-tooltip";
import QRCode from "qrcode.react";
import * as moment from "moment";

import { Link } from "../utils";

import "./Footer.sass";


class Footer extends React.Component {
	render() {
		const lastModified = moment(new Date(document.lastModified));
		return (
			<div className="Footer container">
				<div className="line">Last modified on {lastModified.format("MMM Do, YYYY")}</div>
				<div className="line line-icon">
					<div className="icon">
						<span data-tip data-for="wechat"><i className="fab fa-weixin"></i></span>
						<ReactTooltip id="wechat" clickable="true" type="light" effect="solid" place="top">
							<p className="wechat-id">Id: AndyXukq</p>
							<div className="wechat-qr">
								<QRCode 
									size="256"
									value="https://u.wechat.com/EPh9HBXtm0TYe-QAIFIwGTM"
								/>
							</div>
						</ReactTooltip>
					</div>					
					<div className="icon">
						<Link href="mailto:kx@ieee.org"><i className="fas fa-envelope"></i></Link>
					</div>
					<div className="icon">
						<Link href="https://www.instagram.com/andyxukq/"><i className="fab fa-instagram"></i></Link>
					</div>
					<div className="icon">
						<Link href="https://www.zhihu.com/people/xukq"><i class="fab fa-zhihu"></i></Link>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;