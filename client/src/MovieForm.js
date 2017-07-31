import React,{Component} from 'react'
import classnames from 'classnames'

class MovieForm extends Component{
	state={
		_id:this.props.movie ? this.props.movie._id : null,
		title:this.props.movie ? this.props.movie.title : '',
		director:this.props.movie ? this.props.movie.director : '',
		released:this.props.movie ? this.props.movie.released : '',
		description:this.props.movie ? this.props.movie.description : '',
		poster:this.props.movie ? this.props.movie.poster : '',
		errors:{},
		loading:false,

	}
	
	componentWillReceiveProps(nextProps){
		this.setState({
			_id:nextProps.movie._id,
			title:nextProps.movie.title,
			director:nextProps.movie.director,
			released:nextProps.movie.released,
			description:nextProps.movie.description,
			poster:nextProps.movie.poster,
		})
	}
	handleChange=(evt)=>{
		if(this.state.errors[evt.target.name]){
			let errors=Object.assign({},this.state.errors)
			delete errors[evt.target.name]
			this.setState({
				[evt.target.name]:evt.target.value,errors
			})
		}else{
			this.setState({
				[evt.target.name]:evt.target.value
			})
		}
	}	
		
	handleSubmit=(evt)=>{ //here need to validate the form
		evt.preventDefault()
		let errors={}
		if(this.state.title==='')errors.title="Can't be empty."
		if(this.state.director==='')errors.director="Can't be empty."
		if(this.state.released==='')errors.released="Can't be empty."
		if(this.state.description==='')errors.description="Can't be empty."
		if(this.state.poster==='')errors.poster="Can't be empty."
		this.setState({errors})
		const isValid=Object.keys(errors).length===0
		
		if(isValid){
			const{_id,title,director,released,description,poster}=this.state
			this.setState({loading:true})
			this.props.saveMovie({_id,title,director,released,description,poster})
				.catch((err)=>err.response.json()
						.then(({errors})=>this.setState({errors,loading:false})))
		}
	}

	render(){
		const {_id}=this.state
		const form=(
			<form className={classnames('form-group',{loading:this.state.loading})}
					onSubmit={this.handleSubmit}>
				<h1 className="form-header">{_id ? 'Edit Movie':'Add New Movie'}</h1>
				{this.state.errors.global && 
				<div className="alert alert-danger" role="alert">
					<p>{this.state.errors.global}</p>
				</div>}
				
				<div className={classnames('form-group',{error:this.state.errors.title})}>
					<label htmlFor="title">Title</label>
					<input name="title" id="title" type="text"
							value={this.state.title}
							onChange={this.handleChange}
							placeholder="Title..."
							className="form-control"
					/>
					{this.state.errors.title && 
					<div className="alert alert-danger" role="alert">
							<span>{this.state.errors.title}</span>
					</div>}
				</div>
				
				<div className={classnames('form-group',{error:this.state.errors.director})}>
					<label htmlFor="director">Director</label>
					<input name="director" id="director" type="text"
							value={this.state.director}
							onChange={this.handleChange}
							placeholder="Director..."
							className="form-control"
					/>
					{this.state.errors.director && 
					<div className="alert alert-danger" role="alert">
							<span>{this.state.errors.director}</span>
					</div>}
				</div>
				
				<div className={classnames('form-group',{error:this.state.errors.released})}>
					<label htmlFor="released">Released Date</label>
					<input name="released" id="released" type="date"
							value={this.state.released}
							onChange={this.handleChange}
							placeholder="Released Date..."
							className="form-control"
					/>
					{this.state.errors.released && 
					<div className="alert alert-danger" role="alert">
							<span>{this.state.errors.released}</span>
					</div>}
				</div>
				
			
				<div className={classnames('form-group',{error:this.state.errors.description})}>
					<label htmlFor="description">Description</label>
					<textarea name="description" id="description"
							value={this.state.description}
							onChange={this.handleChange}
							placeholder="Description..."
							className="form-control">
					</textarea>
					{this.state.errors.description && 
					<div className="alert alert-danger" role="alert">
							<span>{this.state.errors.description}</span>
					</div>}
				</div>

				<div className={classnames('form-group',{error:this.state.errors.poster})}>
					<label htmlFor="poster">Poster URL</label>
					<input name="poster" id="poster" type="url"
							value={this.state.poster}
							onChange={this.handleChange}
							placeholder="Poster..."
							className="form-control"
					/>
					{this.state.errors.poster && 
					<div className="alert alert-danger" role="alert">
							<span>{this.state.errors.poster}</span>
					</div>}
				</div>
				

				<div>
					{this.state.poster !=='' && <img src={this.state.poster} alt="poster" className="img-field" />}
				</div>
				
				<div className="form-group">
					<button className="btn btn-primary">Save</button>
				</div>
			</form>
		)
		return(
		<div>
			{form}
		</div>
		)
	}
}
export default MovieForm