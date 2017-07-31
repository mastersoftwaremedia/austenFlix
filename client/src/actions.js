import fetch from 'isomorphic-fetch'

export const MOVIES_FETCHED='MOVIES_FETCHED'
export const MOVIE_FETCHED='MOVIE_FETCHED'
export const MOVIE_ADDED='MOVIE_ADDED'
export const MOVIE_UPDATED='MOVIE_UPDATED'
export const MOVIE_DELETED='MOVIE_DELETED'

function handleResponse(response){
	if(response.ok){
		return response.json()
	}else{
		let error=new Error(response.statusText)
		error.response=response
		throw error
	}
}

export function moviesFetched(movies){
	return{
		type:MOVIES_FETCHED,
		movies
	}
}
export function movieFetched(movie){
	return{
		type:MOVIE_FETCHED,
		movie
	}
}
export function movieAdded(movie){
	return{
		type:MOVIE_ADDED,
		movie
	}
}
export function movieUpdated(movie){
	return{
		type:MOVIE_UPDATED,
		movie
	}
}
export function movieDeleted(movieId){
	return{
		type:MOVIE_DELETED,
		movieId
	}
}
export function getMovie(movie){
	return{
		type:'GET_MOVIE',
		movie
	}
}


export function fetchMovies(){
	return dispatch=>{
		fetch('/api/movies')
		.then(res=>res.json())
		.then(data=>dispatch(moviesFetched(data.movies)))
	}
}
export function fetchMovie(id){
	return dispatch=>{
		fetch(`/api/movies/${id}`)
		.then(res=>res.json())
		.then(data=>dispatch(movieFetched(data.movie)))
	}
}
export function addMovie(data){
	return dispatch=>{
		return fetch('/api/movies',{
			method:'POST',
			body:JSON.stringify(data),
			headers:{
				"Content-Type":"application/json"
			}
		}).then(handleResponse)
		.then(data=>dispatch(movieAdded(data.movie)))
	}
}
export function updateMovie(data){
	return dispatch=>{
		return fetch(`/api/movies/${data._id}`,{
			method:'PUT',
			body:JSON.stringify(data),
			headers:{
				"Content-Type":"application/json"
			}
		}).then(handleResponse)
		.then(data=>dispatch(movieUpdated(data.movie)))
	}
}
export function deleteMovie(id){
	return dispatch=>{
		return fetch(`/api/movies/${id}`,{
			method:'DELETE',
			headers:{
				"Content-Type":"application/json"
			}
		}).then(handleResponse)
		.then(data=>dispatch(movieDeleted(id)))
	}
}