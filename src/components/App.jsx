import React, { PropTypes } from 'react';
import Header from '../containers/Header.jsx';

const App = (props) => <div><Header />{props.children}</div>;

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
