import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ onInputChange, onButtonSumit }) => {
  return (
    <div className='ma4 mt0'>
      <p className='f3'>
        {'This magic can detect faces in your pictures.'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input
            className='f4 pa2 w-70 center'
            type='text'
            onChange={onInputChange}
          />
          <button
          className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
          onClick = {onButtonSumit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
