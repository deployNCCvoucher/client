import React, { useEffect, useState } from 'react';
import { storage } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const Image = ({image, width, height}: any) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const getImage: any = async () => {
      try {
        const storageRef = ref(storage, image);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
      } catch (error) {
        console.error('Error getting image from Firebase:', error);
      }
    };
    getImage();
  }, []);
  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img src={imageUrl} style ={{ width: width, height: height}} alt="Firebase Image" />
  );
};

export default Image;