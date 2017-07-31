import React from 'react'
import PropTypes from 'prop-types'
import MovieItem from './MovieItem'

const MoviesList=({movies,deleteMovie})=>{
	const emptyMessage=<div>There is no list of your movies yet in your collection.</div>
	const moviesList=(
	<div className="featured-movies">
		{movies.map(movie=>
			<MovieItem key={movie._id} 
			movie={movie}
			deleteMovie={deleteMovie} />
		)}

	</div>)
	return(
		<div className="emptyMessage">
		{movies.length===0 ? emptyMessage : moviesList}
		</div>
	)
}
export default MoviesList
MoviesList.propTypes={
	movies:PropTypes.array.isRequired,
	deleteMovie:PropTypes.func.isRequired
}
