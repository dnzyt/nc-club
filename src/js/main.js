import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Store from './stores/Store';
import { Provider } from 'react-redux';
ReactDOM.render(
	<Provider store={Store}>
		<App />
	</Provider>, 
	document.getElementById('main'))