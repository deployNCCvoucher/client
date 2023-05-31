import {
    Box, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, Typography, styled
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from "react";

interface IProps {
    codeVoucher: number;
}
const DetailsVoucher: React.FC<IProps> = ({ codeVoucher }) => {
    const [openViewImg, setOpenViewImg] = useState<boolean>(false)
    const handleViewIamge = () => {
        setOpenViewImg(!openViewImg);
    }
    const ViewImg = styled('div')({
        position: 'fixed',
        zIndex: '8',
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
        paddingTop: '10%',
        background: '#000',
    })
    return (
        <Box sx={{ boxShadow: '0 5px 15px rgba(0,0,0,.35)', mt: '40px' }}>
            <Typography
                component="h2"
                sx={{
                    pb: '30px', pt: '20px', textAlign: 'center', borderBottom: '1px solid #e9e9e9',
                    fontSize: '28px', lineHeight: '32px',
                }}>
                Chi tiet voucher
            </Typography>
            <TableContainer component={Paper} sx={{ p: '0 15px' }}>
                <Table size="small" aria-label="a dense table" sx={{ width: { xs: '700px', sm: '100%' } }}>
                    <TableHead >
                        <TableRow sx={{ "& .MuiTableCell-root": { p: '11px 0px' } }}>
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Note</TableCell>
                            <TableCell align="center"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ "& .MuiTableCell-root": { p: ' 16px' } }}>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" width='10%'>#123K12</TableCell>
                            <TableCell align="center" width='20%'>
                                <Box component='span' sx={{ cursor: 'pointer' }} onClick={handleViewIamge}>
                                    <img src="../images/hoadon.jpg" alt="imga" width={45} height={45} />
                                    {
                                        openViewImg ?
                                            <ViewImg>
                                                <img src="../images/hoadon.jpg" alt="imga" width={400} height='auto' />
                                            </ViewImg> : ''
                                    }
                                </Box>
                            </TableCell>
                            <TableCell align="center" width='20%'>30</TableCell>
                            <TableCell align="center" width='20%'><Box sx={{ color: 'red' }}><CloseIcon /></Box></TableCell>
                            <TableCell align="center" width='30%'>note</TableCell>
                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">#123K12</TableCell>
                            <TableCell align="center">
                                <img src="../images/hoadon.jpg" alt="imga" width={45} height={45} />
                            </TableCell>
                            <TableCell align="center">30</TableCell>
                            <TableCell align="center"><Box sx={{ color: 'blue' }}><CheckIcon /></Box></TableCell>
                            <TableCell align="center">note</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
export default DetailsVoucher;