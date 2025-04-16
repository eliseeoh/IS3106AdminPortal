import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function BookingsHeader({ businessName }: { businessName: string }) {

    return (
        <Box display="flex" alignItems="center" mb={5}>
            <Typography variant="h4" flexGrow={1}>
                Bookings from {businessName}
            </Typography>
        </Box>
    );
}