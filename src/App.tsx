import { Box } from '@mui/material';
import './App.css';
import Header from './components/header/Header';
import SlideBar from './components/slidebar/SlideBar';
import AppRoutes from './routes/AppRoutes';
function App() {
  return (
    <>
      <Header />
      <Box sx={{
        pt: '64px',
        bgcolor: 'rgba(170, 191, 242, 0.368627451)',
      }}>
        <Box sx={{ display: 'flex', }}>
          <Box sx={{ flexShrink: 0, width: '250px', display: 'none' }}>
            <Box sx={{
              boxShadow: '0px 10px 8px 0px rgba(0,0,0,.35)',
              position: 'sticky',
              bgcolor: "#fff",
              height: 'calc(100vh - 64px)',
              top: '64px'
            }}>
              <SlideBar />
            </Box>
          </Box>
          <Box sx={{ width: '100%', }}>
            <Box sx={{ m: "30px", p: "16px", bgcolor: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,.35)', }}>
              <AppRoutes />
            </Box>
          </Box>
        </Box>
      </Box >
    </>

  );
}

export default App;
