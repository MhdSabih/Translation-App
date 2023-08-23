import React, { useState } from "react";
import axios from "axios";
import "./css/translatorArea.css";
import LangModal from "./LangModal";

const TranslatorArea = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [onTranslate, setOnTranslate] = useState("");
  // function to translate text
  const fetchResponse = async () => {
    try {
      const requestBody = {
        currentLang: currentLang || alert(`Enter current language value`),
        targetLang: targetLang || alert(`Choose target language`),
      };
      const { data } = await axios.post(
        `http://localhost:5000/api/translator`,
        requestBody
      );
      setOnTranslate(data.translation);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const onSelectLanguage = (language) => {
    setTargetLang(language);
  };

  const onsubmit = () => {
    fetchResponse();
  };
  // useEffect(() => {
  //   fetchResponse();
  // });

  const currentLangChange = (e) => {
    // console.log(e.target.value);
    setCurrentLang(e.target.value);
  };
  const loadModal = () => {
    setIsModalOpen(true);
  };
  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="translator-main">
      <h2 className="text-center">Translate in any Language</h2>
      <div className="textbox-area">
        <div className="current-lang">
          <h3>Current Language</h3>
          <textarea
            className="currentLang-area"
            rows={20}
            cols={25}
            onChange={currentLangChange}
          />
        </div>
        <div className="target-lang">
          <div className="target-heading">
            <h3 onClick={loadModal}>Choose target Language</h3>
          </div>
          <LangModal
            isOpen={isModalOpen}
            onClose={onModalClose}
            onSelectLanguage={onSelectLanguage}
          />

          <textarea
            className="currentLang-area"
            rows={20}
            cols={25}
            value={onTranslate}
            readOnly
          />
        </div>
      </div>
      <div className="submit-button">
        <button className="currentLang-button" onClick={onsubmit}>
          submit
        </button>
      </div>
    </div>
  );
};

export default TranslatorArea;
