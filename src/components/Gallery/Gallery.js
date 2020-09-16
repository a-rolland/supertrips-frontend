import React from "react";
import ImageGallery from "react-image-gallery";

const Gallery = (props) => {
  const images = props.pictures.map((picture) => {
    return {
      original: picture.url,
      thumbnail: picture.url,
    };
  });

  return <ImageGallery items={images} />;
};

export default Gallery;
