import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchMovie} from './actions'
import MovieDetail from './MovieDetail'

class MovieDetailPage extends Component{

	componentDidMount=()=>{
		const { match } = this.props
		if(match.params._id){
			this.props.fetchMovie(match.params._id)
		}
	}

	render(){
		return(
			<div>
				<MovieDetail movie={this.props.movie} />
			</div>
		)
	}
}

function mapStateToProps(state,props){
	const {match}=props
	if(match.params._id){
		return {
			movie: state.movies.find(item => item._id === match.params._id)
		}
	}
	return { movie: null }
}
export default connect(mapStateToProps,{fetchMovie})(MovieDetailPage)
