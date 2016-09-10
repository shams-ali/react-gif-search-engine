//index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import Home from './containers/Home.jsx';
import Signup from './containers/Signup.jsx';
import Login from './containers/Login.jsx';
import Favorites from './containers/Favorites.jsx';
import requireAuth from './containers/RequireAuth.jsx';
import Splash from './containers/Splash.jsx';


import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="home" component={Home} />
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="favorites" component={requireAuth(Favorites)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
