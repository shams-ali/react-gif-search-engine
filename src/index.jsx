import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Home from './containers/Home.jsx';
import Signup from './containers/Signup.jsx';
import Login from './containers/Login.jsx';
import Favorites from './containers/Favorites.jsx';
import RequireAuth from './containers/RequireAuth.jsx';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="favorites" component={RequireAuth(Favorites)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
