import React, { Fragment, useEffect, useState } from "react";
import { storage } from "./firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { ModalImage } from "../../pages/users/profile/ModalImage/ModalImage";
interface ImageInter {
  image?: string;
  width?: string;
  height?: string;
}

const Image: React.FC<ImageInter> = ({
  image,
  width,
  height,
}: any) => {
  

  const [openImage, setOpenImage] = React.useState(false);
  const handleOpenImage = () => {
    setOpenImage(true);
  };
  const handleCloseImage = () => setOpenImage(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getImage: any = async () => {
      try {
        const storageRef = ref(storage, image);
        const url = await getDownloadURL(storageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error getting image from Firebase:", error);
      }
    };
    getImage();
  }, []);
  return (
    <Fragment>
      <ModalImage
        image={imageUrl}
        openImage={openImage}
        handleClose={handleCloseImage}
      >
      </ModalImage>
      <img
        onClick={handleOpenImage}
        src={imageUrl}
        style={{ width: width, height: height }}
        alt="Firebase Image"
      />
    </Fragment>
  );
};

export default Image;
