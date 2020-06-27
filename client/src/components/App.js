import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import Auth from './Auth';
import Register from './Register';
import RegisterVer from './RegisterVer';
import RegisterSecondVer from './RegisterSecondVer';
import Chat from './Chat';
import Alert from './layout/Alert';

// Redux
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/login';

import '../stylesheets/reset.css';
import '../stylesheets/loading.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Auth} />
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/thanks" component={RegisterVer} />
          <Route exact path="/confirmation/:token" component={RegisterSecondVer} />
          <Route exact path="/login" component={Auth} />
          <Route exact path="/messenger" component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
