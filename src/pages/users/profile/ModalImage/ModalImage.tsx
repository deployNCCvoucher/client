import {
  Box,
  Button,
  Dialog,
} from "@mui/material";
import React, { ReactNode } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ModalImageInter {
  image?: string;
  openImage: boolean;
  handleClose: () => void;
  children: ReactNode;
}

export const ModalImage: React.FC<ModalImageInter> = ({
  image,
  openImage,
  handleClose,
}) => {
  return (
    <Dialog open={openImage} onClose={handleClose}>
      <Box>
        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              {/* <Box sx={{p: '16px', borderBottom: 2}}>
                <Button color="error" onClick={() => zoomIn()} variant='outlined'>Zoom in (+)</Button>
                <Button color="error" sx={{mx: '24px'}} onClick={() => zoomOut()} variant='outlined'>Zoom out (-)</Button>
                <Button color="error" onClick={() => resetTransform()} variant='outlined'>Reset Zoom (x)</Button>
              </Box> */}
              <TransformComponent>
                <img src={image} alt="image" width={600} height={600}/>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </Box>
    </Dialog>
  );
};
