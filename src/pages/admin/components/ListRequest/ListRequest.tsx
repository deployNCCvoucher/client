import { Box, Button } from "@mui/material"
import { ItemsRequest } from "../ItemsRequest/ItemsRequest"

export const ListRequest = () => {
    return (
        <Box>
            <h1>ADMIN</h1>
            <Button variant='outlined'>New admin</Button>
            <h1>List Request</h1>
            <Box>
                <ItemsRequest />
            </Box>
        </Box>
    )
}