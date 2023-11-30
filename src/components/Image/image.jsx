import React, {useState} from "react";
import './image.css';
import images from '../../images'



const Image = ({n}) => {
  

  return  (
    <div className="image-container">
      { images.map(({id, src}) => (
        <img key={id} src={src} />
      ))}
    </div>
  )
}


export default Image;