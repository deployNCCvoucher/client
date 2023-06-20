import { Avatar, Box, Typography } from "@mui/material"
import MailIcon from "@mui/icons-material/Mail";
import LanguageIcon from "@mui/icons-material/Language";

interface InformationInter {
    user: any
}

export const Information: React.FC<InformationInter> = ({user}) => {
    return (
        <Box
            sx={{
              boxShadow: "0 5px 15px rgba(0,0,0,.35)",
              p: "15px",
              borderRadius: "5px",
              height: 1,
            }}
          >
            <Box sx={{ mr: "15px", mt: "15px" }}>
              <Avatar
                alt="Remy Sharp"
                src={user.userImage}
                sx={{ width: 150, height: 150, bgcolor: "red", mx: "auto" }}
              />
            </Box>
            <Box>
              <Box sx={{ mb: "25px", textAlign: "center", mt: "15px" }}>
                <Box
                  component="h2"
                  sx={{
                    color: "#606060",
                    fontSize: "21px",
                    lineHeight: "30px",
                    fontWeight: "500",
                  }}
                >
                  {user.name}
                </Box>
                <Typography sx={{ color: "#767676", fontSize: "16px" }}>
                  {user.role}
                </Typography>
              </Box>
              <Box
                sx={{
                  "& .MuiBox-root": {
                    display: "flex",
                    mb: "8px",
                    color: "#767676",
                  },
                  "& .MuiTypography-root": {
                    color: "#767676",
                    fontSize: "14px",
                    alignItems: "center",
                  },
                }}
              >
                <Box>
                  <MailIcon fontSize="small" />
                  <Typography sx={{ pl: "10px" }}>{user.gmail}</Typography>
                </Box>
                <Box>
                  <LanguageIcon fontSize="small" />
                  <Typography
                    sx={{ pl: "10px" }}
                    component="a"
                    href="https://www.ncc.asia"
                    target="_blank"
                  >
                    https://www.ncc.asia
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
    )
}