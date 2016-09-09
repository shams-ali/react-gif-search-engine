import React, { PropTypes } from 'react';

class SearchBar extends React.Component {
  onInputChange(term) {
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className="search">
        <input
          placeholder="Enter text to search for gifs!"
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onTermChange: PropTypes.func.isRequired,
};

export default SearchBar;
