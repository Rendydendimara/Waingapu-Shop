import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from './store';
// Coba /profile saat user belum login
ReactDOM.render(
	<Provider store={store}> {/* langsung mem-provider global store di root file */}
		<App />
	</Provider>,document.getElementById('root'));

 