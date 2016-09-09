import React from 'react';
import GifItem from './GifItem.jsx';

const GifList = (props) => {
  const gifItems = props.gifs.map((image) =>
    <div>
    <GifItem
      key={image.id}
      gif={image}
      onGifSelect={props.onGifSelect}
      onFavoriteSelect={props.onFavoriteSelect}
      onFavoriteDeselect={props.onFavoriteDeselect}
      isAuthenticated={props.isAuthenticated}
      isFavorite={props.isFavorite}
    />
    </div>
  );

  return (
    <div className="gif-list">{gifItems}</div>
  );
};

export default GifList;
