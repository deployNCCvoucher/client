import { Box } from "@mui/material"
import { ListRequest } from "./components/ListRequest/ListRequest"
export const AdminPage = () => {
    return (
        <Box>
            <ListRequest history={false}/>
        </Box>
    )
}