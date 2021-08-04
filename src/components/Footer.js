import React from "react";
import ReactTooltip from "react-tooltip";
import QRCode from "qrcode.react";

import Navbar from "./Navbar";
import { Link } from "./Utils";

import "./Footer.sass";


class Footer extends React.Component {
	render() {
		return (
			<div className="Footer container">
				<Navbar>
					{/*<div className="item"><Link href="https://www.linkedin.com/in/andykx/" target="_blank">LinkedIn</Link></div>*/}
					<div className="item"><Link href="https://www.instagram.com/andyxukq/" target="_blank">Instagram</Link></div>
					<div className="item"><Link href="mailto:kx@ieee.org" target="_blank">Email</Link></div>
					<div className="item">
						<span data-tip data-for="wechat">WeChat</span>
						<ReactTooltip id="wechat" clickable={true} type="light" effect="solid" place="top">
							<p className="wechat-id">id: andyxukq</p>
							<div className="wechat-qr">
								<QRCode 
									size={128}
									value="https://u.wechat.com/EPh9HBXtm0TYe-QAIFIwGTM"
								/>
							</div>
						</ReactTooltip>
					</div>	
				</Navbar>
			</div>
		);
	}
}

export default Footer;