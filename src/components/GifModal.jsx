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
      <div className="provider-profile page">
        <section className="content">
          <section className="main">
            <h1>{props.selectedGif.name}</h1>
            <div className="mission">
              {props.selectedGif.benefits}
            </div>
            <hr />
            { /* Benefits & Requirements */ }
            <section className="benefits">
              <h2>Benefits</h2>
              <p>{props.selectedGif.benefits}</p>
            </section>
            <section className="requirements">
              <h2>Requirements</h2>
              <ul>
                {props.selectedGif.requirements.map(req =>
                  <li key={req}>{req}</li>)}
              </ul>
            </section>
            <section>
            <h2>Upcoming sessions</h2>
            <ul>
              {props.selectedGif.upcomingSessions.map(ses =>
                <li key={ses}>{ses}</li>)}
            </ul>
            </section>
            <section>
              <img src={props.selectedGif.src}></img>
            </section>
          </section>
          <section className="sidebar">
            <img src={props.selectedGif.logo}></img>
            <div className="contact-block">
            {props.selectedGif.contact.map(contact =>
              <li key={contact}>{contact}</li>)}
            </div>
          </section>
        </section>
        <button onClick={() => props.onRequestClose()}>close</button>
      </div>
      </div>
    </Modal>
  );
};

GifModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default GifModal;
