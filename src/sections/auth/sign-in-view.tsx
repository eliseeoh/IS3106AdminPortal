import { useState, useCallback } from 'react';

import { Alert, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import Api from 'src/helpers/Api';
import ChangePasswordDialog from './changePasswordDialog';



// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSignIn = () => {

    Api.signIn(email, password)
      .then((res) => {
        if (!res.ok) {
          setSnackbarMessage("Invalid credentials or disabled account");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          throw new Error("Unauthorized: Invalid email or password");
        }
        return res.json();
      })
      .then((json) => {
        setSnackbarMessage("Login successful");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        localStorage.setItem("accesstoken", json.accessToken);
        router.push("/home");
        console.log("Login successful:", json);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }} onClick={() => setOpen(true)}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account? Request from your manager.
        </Typography>
      </Box>

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

      {renderForm}

      <ChangePasswordDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
