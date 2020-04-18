import React from "react";

import * as requests from "../requests";
import Loader from './Loader';

import "./Posts.sass";

class PostItem extends React.Component {
	constructor(props) {
		super(props);
		this.pictureRef = React.createRef();
		this.pictureLoaderRef = React.createRef();
		this.imageLoader = null;
	}
	render() {
		const data = this.props.data;
		this.imageContainer = new Image();
		if (data.picture) { 
			this.imageContainer.src = requests.file_url(data.picture.data.url)
			this.imageContainer.onload = (e) => {
				this.pictureRef.current.onload = ()=>{
					this.pictureLoaderRef.current.style.display = "none";
					this.pictureRef.current.style.display = "inline";
				};
				this.pictureRef.current.src = this.imageContainer.src;
			};
		}
		
		const isMobile = window.innerWidth < 768;
		return (
			<div className="Post columns is-mobile">
				<div className="picture column is-narrow">
					<img ref={this.pictureRef} alt="post" style={{display: "none"}}/>
					<Loader innerRef={this.pictureLoaderRef}/>
				</div> 
				<div className="description column">
					<div className="name">{data.title || <Loader count={isMobile?2:1}/>}</div>
					<div className="tags">{data.tags || <Loader />}</div>
					{data.excerpt?
					<div className="excerpt" dangerouslySetInnerHTML={{"__html":data.excerpt}}></div>:
					<div className="excerpt"><Loader count={2}/></div>
					}
				</div>
			</div>
		);
	}
	componentWillUnmount() {
		this.pictureRef.current.onload = null;
		this.imageContainer.onload = null;
	}
}

class Posts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data:null};
	}

	render() {
		const data = this.state.data || [{},{}];

		return data.map((r, index)=>(
			<PostItem key={index} data={r} />
		));
	}

	componentDidMount() {
		requests.get_projects().then(r=>{
			this.setState({
				data: r.data
			})
		})
	}
}

export default Posts;