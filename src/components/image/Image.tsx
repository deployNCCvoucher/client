import React, { useEffect, useState } from 'react';
import { storage } from './firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const Image = ({image}: any) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const getImage = async () => {
      try {
        const storageRef = ref(storage, image);
        const url = await getDownloadURL(storageRef);
        console.log('url', url)
        setImageUrl(url);
      } catch (error) {
        console.error('Error getting image from Firebase:', error);
      }
    };

    getImage();
  }, []);

  return (
    <img src={imageUrl} alt="Firebase Image" />
  );
};

export default Image;