import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { ThemeProvider } from 'react-jss';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

const theme = {
    // colors
    viewBackground: '#313132',
    darkBackground: '#212121',
    eliteOrange: '#faa500',
    enduringRed: '#d50000',
    karmicPurple: '#7d00d1',
    // layouts
    radius: 3,
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <HashRouter>
                    <App />
            </HashRouter>
        </Provider>
    </ThemeProvider>
, document.getElementById('root'));