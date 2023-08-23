import { useState } from "react";
import React from "react";
import "./css/Modal.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const LangModal = ({ isOpen, onClose, onSelectLanguage }) => {

  const [selectedLanguage, setSelectedLanguage] = useState("")

  const handleLanguageSelector = () => {
    onSelectLanguage(selectedLanguage);
    onClose();
  }

  const handleEventChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Choose target language"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-field">
        <div className="field-heading">
          <h2>Enter language code: </h2>
        </div>
        <div className="field-input">
          <input
            type="text"
            placeholder="i.e. en"
            onChange={handleEventChange}
          />
        </div>
      </div>
      <div className="lang-selector">
        <button onClick={handleLanguageSelector} >Selected</button>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default LangModal;
