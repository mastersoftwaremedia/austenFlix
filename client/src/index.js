import React from 'react'
import {render} from 'react-dom'
import {createStore,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './rootReducer'
import {BrowserRouter as Router} from 'react-router-dom'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import App from './App'
import './index.css'

const store=createStore(
	rootReducer,
	undefined,
	composeWithDevTools(
		applyMiddleware(thunk,createLogger())
	)
)

render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>,
	document.getElementById('root')
)