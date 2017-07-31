import React,{Component} from 'react'
import {Route,Link,Redirect} from 'react-router-dom'
import MoviesHomePage from './MoviesHomePage'
import MovieFormPage from './MovieFormPage'
import MovieDetailPage from './MovieDetailPage'

class App extends Component{
	render(){
		return(
			<div className="container-fluid">
				<div className="app-header">
					<h2>Chick Flix</h2>
					<Link to="/movies"><span className="glyphicon glyphicon-home" aria-hidden="true"></span> Home</Link>
					<Link to="/movies/new"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add New Movie</Link>
				</div>
				<Redirect from="/" exact to="/movies"/>
				<Route exact path="/movies" component={MoviesHomePage}/>
				<Route exact path="/movies/new" component={MovieFormPage}/>
				<Route exact path="/movie/edit/:_id" component={MovieFormPage}/>
				<Route exact path="/movie/:_id" component={MovieDetailPage} />
			</div>
		)
	}
}
export default App