import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const MovieItem=({movie,deleteMovie})=>{
	return(
	<div className="featured-movie">
		<div className="featured-movie_image">
			<img src={movie.poster} alt={movie.title} />

			<div className="featured-movie_info">
				<p><b>{movie.title}</b></p>
				<p>{movie.director}</p>
				<p><i>{movie.released}</i></p>
				<p><Link to={`/movie/${movie._id}`}>More... </Link>| 
				<Link to={`/movie/edit/${movie._id}`}> Edit  </Link>|
				<a href="#"
				onClick={()=>deleteMovie(movie._id)}>  Delete</a></p>
			</div>
		</div>

</div>
	)
}
export default MovieItem
MovieItem.propTypes={
	movie:PropTypes.object.isRequired,
	deleteMovie:PropTypes.func.isRequired
}
