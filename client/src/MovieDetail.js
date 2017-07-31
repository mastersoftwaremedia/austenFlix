import React from 'react'

const MovieDetail=({movie})=>(
	<div>
		<div className="movie-title">
			<h2>{movie.title}</h2>
			<hr/>
		</div>
		
		<div className="movie-container">
			<div className="movie-image">
				<img src={movie.poster} alt={movie.title}/>
			</div>
			<div className="movie-information">
				<p><b>Director: </b> {movie.director}</p>
				<p><b>Release Date: </b> {movie.released}</p>
				<p><b>Description: </b> {movie.description}</p>
			</div>
		</div>
	</div>
)
export default MovieDetail