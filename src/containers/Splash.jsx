import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Splash extends React.Component {

  render() {
    return (
      <section className="hero">
        <img src="http://www.youthempowermentproject.org/images/stories/Banner10.jpg" alt="cant find this"></img>

        <div className="overlay">
          <h1>Make a connection</h1>
          <div className="find-opportunity">
            <Link to="/home">Find an Opportunity</Link>
          </div>
        </div>

        <blockquote>
          Write something cool here
        </blockquote>

      </section>
    );
  }
}


export default Splash;
