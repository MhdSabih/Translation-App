import React from 'react';
import './css/TranslatedText.css';

const TranslatedText = ({translatedText}) => {
  return (
    <div className='Translated-text-area'>
      <h1 className='main-heading'>Translation Success!</h1>
      <p>{translatedText}</p>
    </div>
  );
};

export default TranslatedText;
