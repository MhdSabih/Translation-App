import React from 'react';
import './css/TranslatedText.css';

const TranslatedText = ({extractedText}) => {
  return (
    <div className='Translated-text-area'>
      <h1 className='main-heading'>Translation Success!</h1>
      <p>{extractedText}</p>
    </div>
  );
};

export default TranslatedText;
