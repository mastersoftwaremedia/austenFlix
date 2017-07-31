import React,{Component} from 'react'
import MovieForm from './MovieForm'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchMovie,addMovie,updateMovie} from './actions'

class MovieFormPage extends Component{
	state={redirect:false}
	componentDidMount(){
		const {match}=this.props
		if(match.params._id){
			this.props.fetchMovie(match.params._id)
		}
	}

	saveMovie=({_id,title,director,released,description,poster})=>{
		if(_id){
			return this.props.updateMovie({_id,title,director,released,description,poster})
				.then(()=>this.setState({redirect:true}))
		}else{
			return this.props.addMovie({title,director,released,description,poster})
				.then(()=>this.setState({redirect:true}))
		}
	}
	render(){
		return(
			<div>
				{this.state.redirect ?
				<Redirect to="/movies" />:
				<MovieForm movie={this.props.movie} 
						saveMovie={this.saveMovie}/>
				}
			</div>
		)
	}
}
function mapStateToProps(state,props){
	const {match}=props
	if(match.params._id){
		return{
			movie:state.movies.find(item=>
			item._id===match.params._id)
		}
	}
	return {movie:null}
}
export default connect(
mapStateToProps,{fetchMovie,addMovie,updateMovie}
)(MovieFormPage)