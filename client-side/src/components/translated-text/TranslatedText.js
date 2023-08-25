import React, { useState } from "react";
import "./css/TranslatedText.css";
import Spinner from "../../loader/Spinner";

const TranslatedText = ({ translatedText, isLoad }) => {
  return (
    <div className="Translated-text-area">
      {isLoad ? (
        <Spinner />
      ) : (
        <div className="dummy-text-area">
          <h1 className="main-heading">Translation Success!</h1>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatedText;
