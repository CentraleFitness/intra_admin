import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from "./App";

import reducers from '../reducers';

const store = createStore(reducers);

class AppContainer extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

export default AppContainer;