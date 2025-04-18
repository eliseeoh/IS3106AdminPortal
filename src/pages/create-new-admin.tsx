import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, 
    FormControl, Select, Card, CardContent, Snackbar, 
    Alert, MenuItem} from "@mui/material";
import { useRouter } from "src/routes/hooks";
import { useEffect, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import Api from 'src/helpers/Api';

// ----------------------------------------------------------------------

export function CreateAdmin() {
    const { register, handleSubmit, control } = useForm();
    const router = useRouter();

    const [updateData, setUpdateData] = useState<Record<string, any>>({role: 'admin'});

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const insertUpdateData = (attributeName: string, value: any) => {
        setUpdateData((prev) => ({ ...prev, [attributeName]: value }));
    }

    const onSubmit = async () => {
        console.log("Form submitted with data:", updateData);
        const formData = new FormData();
        const newAdmin = {
            ...updateData,
            status: "Created",
            password: updateData.phoneNumber,
        }

        // @ts-ignore
        formData.append("admin", JSON.stringify(newAdmin));

        Api.createAdmin(formData)
            .then((response) => {
                if ( response.ok) {
                    console.log("Admin created successfully:", response);
                    setSnackbarMessage("Admin created successfully!");
                    setSnackbarSeverity("success");
                    setOpenSnackbar(true);
                    router.back();
                } else {
                    console.error("Failed to create admin:", response);
                    setSnackbarMessage("Failed to create admin.");
                    setSnackbarSeverity("error");
                    setOpenSnackbar(true);
                }
            });
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4, p: 3, boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Create New Admin
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Create a new admin account by filling in the details below.
                    </Typography>
                    <FormControl>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {/* Admin Name */}
                            <TextField
                                fullWidth
                                label="Admin Name"
                                required
                                {...register('name', { required: 'Admin name is required' })}
                                sx={{ mb: 2 }}
                                onChange={(e) => insertUpdateData("name", e.target.value)}
                            />
                            {/* Admin Email */}
                            <TextField
                                fullWidth
                                label="Admin Email"
                                required
                                type="email"
                                {...register('email', { required: 'Admin Email is required' })}
                                onChange={(e) => insertUpdateData("email", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            {/* Admin Phone Number */}
                            <TextField
                                fullWidth
                                label="Admin Phone Number"
                                type='tel'
                                inputProps={{
                                    pattern:  "^[689]{1}[0-9]{7}$",  // Only allows numbers with 10 digits
                                    maxLength: 8,  // Limits the input to 10 characters
                                }}
                                required
                                rows={3}
                                sx={{ mb: 2 }}
                                onChange={(e) => insertUpdateData("phoneNumber", e.target.value)}
                            />
                            {/* Admin DOB */}
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                required
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                                onChange={(e) => insertUpdateData("dob", e.target.value)}
                            />
                            {/* Role */}
                            <Select
                                label="Role"
                                fullWidth
                                required
                                value={updateData?.role || 'admin'}
                                sx={{ mb: 2 }}
                                onChange={(e) => {
                                    console.log("Role selected:", e.target.value);
                                    insertUpdateData("role", e.target.value)}}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="manager">Manager</MenuItem>
                            </Select>

                            <Typography variant="body2" color="error" sx={{ mb: 3 }}>
                                Default admin password is <strong>their phone number</strong>.
                            </Typography>

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" type="submit" sx={{ px: 4 }}>
                                    Create New Admin
                                </Button>
                            </Box>
                        </form>
                    </FormControl>
                </CardContent>
            </Card>
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
        </Container>
    );
};

export default CreateAdmin;
