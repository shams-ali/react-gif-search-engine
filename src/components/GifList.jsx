import React, { PropTypes } from 'react';
import GifItem from './GifItem.jsx';

const GifList = (props) => {
  const gifItems = props.gifs.map((image) =>
    <GifItem
      key={image.id}
      gif={image}
      onGifSelect={props.onGifSelect}
      onFavoriteSelect={props.onFavoriteSelect}
      onFavoriteDeselect={props.onFavoriteDeselect}
      isAuthenticated={props.isAuthenticated}
      isFavorite={props.isFavorite}
    />
  );

  return (
    <div className="gif-list">{gifItems}</div>
  );
};

GifList.propTypes = {
  gifs: PropTypes.array.isRequired,
};

export default GifList;
