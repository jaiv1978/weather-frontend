import { Alert, Snackbar } from "@mui/material";

export interface CustomSnackbarProps {
    message: string;
    open: boolean;
    severety: 'success' | 'info' | 'warning' | 'error';
    onClose: () => void;
}

const CustomSnackbar = ({
    message,
    open,
    severety,
    onClose
}: CustomSnackbarProps) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severety} sx={{ width: '100%' }}>
                { message }
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackbar;
