import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ imagURL, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute nt2'>
        <img id='inputImage' alt='' src={imagURL} width='500px' height='auto'/>
        <div className='bounding_box' style={{top: box.topRow, left: box.leftCol, bottom: box.bottomRow, right: box.rightCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
