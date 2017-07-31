import {
	MOVIES_FETCHED,
	MOVIE_FETCHED,
	MOVIE_ADDED,
	MOVIE_UPDATED,
	MOVIE_DELETED} from '../actions'

export default function movies(state=[],action){
	switch(action.type){
		case MOVIES_FETCHED:
			return action.movies
		case MOVIE_FETCHED:
			return state.map(item=>{
				if(item._id===action.movie._id)return action.movie 
				return item 
			})
		case MOVIE_ADDED:
			return [...state,action.movie]
		case MOVIE_UPDATED:
			return state.map(item=>{
				if(item._id===action.movie._id) return action.movie
				return item
			})
		case MOVIE_DELETED:
			return state.filter(item=> item._id!==action.movieId)
		default: 
			return state
	}
}