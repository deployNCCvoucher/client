import { Avatar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';

const MyProfile = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{
                display: "flex",
                boxShadow: '0 5px 15px rgba(0,0,0,.35)',
                p: '15px', borderRadius: "5px",
                mr: '20px'
            }}>
                <Box sx={{ mr: '15px' }}>
                    <Avatar
                        alt="Remy Sharp"
                        src="./images/family-img.png"
                        sx={{ width: 120, height: 120, bgcolor: 'red' }}
                    />
                </Box>
                <Box>
                    <Box sx={{ mb: '25px' }}>
                        <Box
                            component="h2"
                            sx={{ color: '#606060', fontSize: '21px', lineHeight: '30px', fontWeight: '500' }}
                        >
                            Hoang Phi Khanh
                        </Box>
                        <Typography sx={{ color: '#767676', fontSize: '16px' }}>
                            dev
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            "& .MuiBox-root": {
                                display: 'flex',
                                color: '#767676',
                                fontSize: '16px',
                                lineHeight: '30px',
                                alignItems: 'center',
                                mb: '8px'
                            }
                        }}
                    >
                        <Box>
                            <MailIcon fontSize="small" />
                            <Typography sx={{ pl: '10px' }}>
                                @gmail.com
                            </Typography>
                        </Box>
                        <Box>
                            <CallIcon fontSize="small" />
                            <Typography sx={{ pl: '10px' }}>
                                0888999777
                            </Typography>
                        </Box>
                        <Box>
                            <LanguageIcon fontSize="small" />
                            <Typography sx={{ pl: '10px' }} component='a' href="https://www.ncc.asia" target="_blank">
                                https://www.ncc.asia
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ boxShadow: '0 5px 15px rgba(0,0,0,.35)', }}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Voucher</TableCell>
                            <TableCell align="center">Total</TableCell>
                            <TableCell align="center">Reject</TableCell>
                            <TableCell align="center">Approved</TableCell>
                            <TableCell align="center">total money</TableCell>
                            <TableCell align="center"></TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ "& .MuiTableCell-root": { p: '16px' } }}>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                Type -30k
                            </TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center">60k</TableCell>
                            <TableCell align="center">chitiet</TableCell>

                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                Type -50k
                            </TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center">100k</TableCell>
                            <TableCell align="center">chitiet</TableCell>

                        </TableRow>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                Type -100k
                            </TableCell>
                            <TableCell align="center">5</TableCell>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">3</TableCell>
                            <TableCell align="center">200k</TableCell>
                            <TableCell align="center">chitiet</TableCell>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default MyProfile;