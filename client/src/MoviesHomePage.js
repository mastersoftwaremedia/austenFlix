import React,{Component} from 'react'
import PropTypes from 'prop-types'
import MoviesList from './MoviesList'
import {connect} from 'react-redux'
import {fetchMovies,deleteMovie} from './actions'

class MoviesHomePage extends Component{
	componentDidMount(){
		this.props.fetchMovies()
	}
	render(){
		return(
		<div>
			<h2 className="featured-movies_header">
				Featured Movies
			</h2>
			<hr/>
			<div>
				<MoviesList movies={this.props.movies}
				deleteMovie={this.props.deleteMovie}/>
			</div>
		</div>
		)
	}
}
MoviesHomePage.propTypes={
	movies:PropTypes.array.isRequired,
	fetchMovies:PropTypes.func.isRequired,
	deleteMovie:PropTypes.func.isRequired
}
function mapStateToProps(state){
	return {
		movies:state.movies
	}
}
export default connect(mapStateToProps,{fetchMovies,deleteMovie})(MoviesHomePage)