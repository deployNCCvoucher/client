import { Avatar, Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';
import { MultipleSelect } from "../../../components/select/MultipleSelect";
import DetailsVoucher from "./detailsVoucher/DetailsVoucher";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hook/useTypedSeletor";


const MyProfile = () => {
    const user = useAppSelector((state) => state.user.currentUser);
    const moths = { value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "Month", type: 1 };
    const years = { value: [2021, 2022, 2023, 2024], label: "Year", type: 2 };
    const [codeVoucher, setCodeVoucher] = useState<number>(0)
    const handleDetailsVoucher = (data: number) => {
        setCodeVoucher(codeVoucher);
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3.5}>
                    <Box sx={{
                        boxShadow: '0 5px 15px rgba(0,0,0,.35)',
                        p: '15px', borderRadius: "5px",
                    }}>
                        <Box sx={{ mr: '15px' }}>
                            <Avatar
                                alt="Remy Sharp"
                                src="./images/family-img.png"
                                sx={{ width: 150, height: 150, bgcolor: 'red', mx: 'auto' }}
                            />
                        </Box>
                        <Box>
                            <Box sx={{ mb: '25px', textAlign: 'center', mt: '15px' }}>
                                <Box
                                    component="h2"
                                    sx={{ color: '#606060', fontSize: '21px', lineHeight: '30px', fontWeight: '500' }}
                                >
                                    {user.name}
                                </Box>
                                <Typography sx={{ color: '#767676', fontSize: '16px' }}>
                                    {user.role}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    "& .MuiBox-root": {
                                        display: 'flex',
                                        mb: '8px',
                                        color: '#767676',
                                    },
                                    "& .MuiTypography-root": {
                                        color: '#767676',
                                        fontSize: '14px',
                                        alignItems: 'center',
                                    }
                                }}
                            >
                                <Box>
                                    <MailIcon fontSize="small" />
                                    <Typography sx={{ pl: '10px' }}>
                                        {user.gmail}
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
                </Grid>
                <Grid item xs={12} md={8.5}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '25px' }} >
                            <MultipleSelect date={moths} />
                            <MultipleSelect date={years} />
                        </Box>
                        <TableContainer component={Paper} sx={{ boxShadow: '0 5px 15px rgba(0,0,0,.35)', p: '0 15px' }}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead >
                                    <TableRow sx={{ "& .MuiTableCell-root": { p: '11px 0px' } }}>
                                        <TableCell align="center">Voucher</TableCell>
                                        <TableCell align="center">Request</TableCell>
                                        <TableCell align="center">Reject</TableCell>
                                        <TableCell align="center">Approved</TableCell>
                                        <TableCell align="center">Money</TableCell>
                                        <TableCell align="center"></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ "& .MuiTableCell-root": { p: ' 16px' } }}>
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
                                        <TableCell align="center">
                                            <button onClick={e => handleDetailsVoucher(1)}>details</button>
                                        </TableCell>

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
                                        <TableCell align="center"><button>details</button></TableCell>

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
                                        <TableCell align="center"><button>details</button></TableCell>
                                    </TableRow>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">Total</TableCell>
                                        <TableCell align="center">15</TableCell>
                                        <TableCell align="center">6</TableCell>
                                        <TableCell align="center">9</TableCell>
                                        <TableCell align="center">360k</TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Grid>
            </Grid>
            <DetailsVoucher codeVoucher={codeVoucher} />
        </>

    )
}
export default MyProfile;