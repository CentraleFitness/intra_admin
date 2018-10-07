import React from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';

import Login from './Login';
import Home from './Home';
import Managers from './Managers';
import Dashboard from './Dashboard';
import EnsureLoggedInContainer from './EnsureLoggedInContainer';
import Feedbacks from "./Feedbacks";
import Administrators from "./Administrators";
import Modules from "./Modules";

class App extends React.Component {

    render() {
        return (

            <Router history={browserHistory}>
              <Route path={"/auth"} component={Login}/>
              <Route component={EnsureLoggedInContainer}>
                <Route path={"/"} component={Dashboard}>
                  <IndexRedirect to="/home" />
                  <Route path={"home"} component={Home}/>
                  <Route path={"managers"} component={Managers}/>
                  <Route path={"feedback"} component={Feedbacks}/>
                  <Route path={"modules"} component={Modules}/>
                  <Route path={"administrators"} component={Administrators}/>
                </Route>
              </Route>
            </Router>
        );
    }
}

export default App;