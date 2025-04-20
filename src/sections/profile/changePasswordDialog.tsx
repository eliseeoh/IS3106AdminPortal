import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Api from "src/helpers/Api";
import { useRouter } from "src/routes/hooks";

export type ChangePasswordDialogProps = {
    open: boolean;
    handleClose: () => void;
};

export default function ChangePasswordDialog({ open, handleClose }: ChangePasswordDialogProps) {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [isNotRepeatPassword, setIsNotRepeatPassword] = useState(false);

    const handleChangePassword = async () => {
        Api.changePassword(oldPassword, newPassword)
            .then((response) => {
                if (response.ok) {
                    setSnackbarMessage("Password changed!");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    handleClose();
                    router.refresh();
                }
                else {
                    setSnackbarMessage("Failed to change password");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                    handleClose();
                }
            });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSamePassword(false);
        setIsNotRepeatPassword(false);
        if (newPassword !== confirmPassword) {
            setIsNotRepeatPassword(true);
            console.log("New password and confirm password do not match");
            return;
        }
        if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
            console.log("Please fill in all fields");
            return;
        }
        if (oldPassword === newPassword) {
            setIsSamePassword(true);
            return;
        }
        handleChangePassword();
    }
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <form
                    onSubmit={handleSubmit}
                >
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            For first time users, please change the default password to your own password to activate your account.
                            <br /><br />To change your password, please enter your old password and the new password you want to set.
                            <br />{isSamePassword && (<span style={{ color: "red" }}>New password must be different</span>)} {isNotRepeatPassword && (<span style={{ color: "red" }}>New password and confirm password do not match</span>)}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="old"
                            name="oldPassword"
                            label="Old Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(event) => setOldPassword(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="new"
                            name="newPassword"
                            label="New Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(event) => setNewPassword(event.target.value)}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="confirm"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(event) => setConfirmPassword(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="error" variant="contained">Cancel</Button>
                        <Button type="submit" variant="contained">Confirm Change</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}