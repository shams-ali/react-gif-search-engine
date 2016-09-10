import React, { PropTypes } from 'react';

class GifItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorited: this.props.isFavorite };
  }

  favoriteGif() {
    this.setState({ favorited: true });
    this.props.onFavoriteSelect(this.props.gif);
  }

  unfavoriteGif() {
    this.setState({ favorited: false });
    this.props.onFavoriteDeselect(this.props.gif);
  }

  renderFavoriteHeart() {
    if (!this.props.isAuthenticated) {
      return '';
    }

    if (this.state.favorited) {
      return <i className="favorite fa fa-heart" onClick={() => this.unfavoriteGif()} />;
    }

    return <i className="favorite fa fa-heart-o" onClick={() => this.favoriteGif()} />;
  }

  render() {
    return (
      <div className="gif-item">
        { this.renderFavoriteHeart() }
        <p
          src={this.props.gif.name}
          onClick={() => this.props.onGifSelect(this.props.gif)}
          role="presentation"
        >
          {this.props.gif.name}
        </p>
      </div>
    );
  }
}

GifItem.propTypes = {
  onGifSelect: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onFavoriteDeselect: PropTypes.func.isRequired,
  onFavoriteSelect: PropTypes.func.isRequired,
  gif: PropTypes.object.isRequired,
};

export default GifItem;
