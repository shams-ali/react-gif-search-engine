import React, { PropTypes } from 'react';
import Modal from 'react-modal';

const GifModal = (props) => {
  if (!props.selectedGif) {
    return <div />;
  }

  return (
    <Modal
      isOpen={props.modalIsOpen}
      onRequestClose={() => props.onRequestClose()}
    >
      <div className="gif-modal">
        <img src={props.selectedGif.images.original.url} role="presentation" />
        <p>
          <strong>Source:</strong>
          <a href={props.selectedGif.source}>{props.selectedGif.source}</a>
        </p>
        <p>
          <strong>Rating:</strong>{props.selectedGif.rating}
        </p>
        <button onClick={() => props.onRequestClose()}>close</button>
      </div>
    </Modal>
  );
};

GifModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default GifModal;
