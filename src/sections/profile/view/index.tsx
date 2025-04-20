import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { Button, Card, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import EditIconSVG from 'src/components/editIconSVG';
import Api, { address } from 'src/helpers/Api';
import { useRouter } from 'src/routes/hooks';
import ChangePasswordDialog from '../changePasswordDialog';
// ----------------------------------------------------------------------

export function ProfileView() {
    const Router = useRouter();
    const dataPrep = {
        _id: "dsa",
        name: "Stacy Lee",
        age: 25,
        status: true,
        profilePicture: "/assets/images/avatar/avatar-1.webp",
        address: "Parc Valley",
        phoneNumber: "123-456-7890",
        dob: "01/01/1996",
        role: "Executive Asscheeks",
        appointment: "Executive",
        entityType: "admin",
        email: "stacy.lee@gmail.com",
        password: "password",
    }

    const [data, setData] = useState(dataPrep);
    const [updateData, setUpdateData] = useState({});
    const [isEditPage, setEditPage] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleRoleChange = (event: SelectChangeEvent) => {
        setIsAdmin(event.target.value === "admin");
        insertUpdateData("role", event.target.value.toLowerCase());
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const insertUpdateData = (attributeName: string, value: any) => {
        setUpdateData((prev) => ({ ...prev, [attributeName]: value }));
    }

    const fetchProfileData = () => {
        Api.getProfile()
            .then((res) => {
                if (res.status === 404) {
                    throw new Error("Unauthorized");
                }
                return res.json();
            })
            .then((json) => {
                setData(json);
                console.log("Profile data fetched successfully:", json);
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message); // Optionally show an alert to the user
            });
    };

    const handleSaveDetail = () => {
        Api.updateProfile(updateData, profileImage, data._id).then((res) => {
            if (res.status === 404) {
                throw new Error("Unauthorized");
            }
            fetchProfileData();
        }).catch((error) => {
            console.error(error.message);
            alert(error.message); // Optionally show an alert to the user
        });
    }

    const handleDisableAccount = () => {
        Api.disableAccount()
            .then((res) => {
                if (res.ok) {
                    Router.push('/sign-in');
                }
                else {
                    throw new Error("Failed to disable account");
                }
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message); // Optionally show an alert to the user
            });
    }

    const changeProfilePicture = () => {
        // Change profile picture
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setProfileImage(file);
        // Create a URL for preview
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);

        // Here, you can also upload the image to an API

    };

    return (
        <DashboardContent>
            <Card>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ width: '100%', padding: 16, display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: 288, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: '#121417', fontSize: 32, fontWeight: '700', lineHeight: '40px' }}>Admin Profile</div>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: 16, display: 'flex' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ position: 'relative', width: 128, height: 128, backgroundColor: '#ccc', borderRadius: 12 }}>
                                    <img src={selectedImage || `${address}/${data.profilePicture}`} alt="Business Avatar" style={{ width: '100%', height: '100%', borderRadius: 12, objectFit: "cover" }} />
                                    {isEditPage && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ position: 'absolute', bottom: 8, right: 8, padding: 4, minWidth: 'auto', borderRadius: '50%' }}
                                            onClick={changeProfilePicture}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ position: "absolute", opacity: 0, width: "100%", height: "100%", cursor: "pointer" }}
                                                onChange={handleImageChange}
                                            />
                                            <EditIconSVG />
                                        </Button>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: 22, fontWeight: '700' }}>{data.name}</div>
                                    {isEditPage && data.role === "manager" ? (<div>
                                        <Typography variant='subtitle2'>Appointment</Typography>
                                        <TextField
                                            fullWidth
                                            name="appointment"
                                            label=""
                                            defaultValue={data.appointment}
                                            InputLabelProps={{ shrink: true }}
                                            onChange={(e) => insertUpdateData("appointment", e.target.value)}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                    </div>) : (<div style={{ fontSize: 16, color: '#617A8A' }}>{data.appointment}</div>)}
                                    {isEditPage && data.role === "manager" ? (<div>
                                        <Typography variant='subtitle2'>Role</Typography>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={isAdmin ? "admin" : "manager"}
                                            label="role"
                                            onChange={handleRoleChange}
                                        >
                                            <MenuItem value="admin">Admin</MenuItem>
                                            <MenuItem value="manager">Manager</MenuItem>
                                        </Select>
                                    </div>) : (<div style={{ fontSize: 16, color: '#617A8A' }}>{data.role.charAt(0).toUpperCase() + data.role.slice(1)}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>Admin Details</div>
                    </div>

                    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', borderTop: '1px solid #E5E8EB', padding: 16 }}>
                            <div style={{ flex: 1, paddingRight: 16 }}>
                                <div style={{ fontSize: 14, color: '#617A8A' }}>Name</div>
                                {isEditPage ? (<div>
                                    <TextField
                                        fullWidth
                                        name="name"
                                        label=""
                                        defaultValue={data.name}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => insertUpdateData("name", e.target.value)}
                                        sx={{ mb: 3, mt: 1 }}
                                    />
                                </div>) : (<div style={{ fontSize: 14 }}>{data.name}</div>)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, color: '#617A8A' }}>Address</div>
                                {isEditPage ? (<div>
                                    <TextField
                                        fullWidth
                                        name="address"
                                        label=""
                                        defaultValue={data.address}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => insertUpdateData("address", e.target.value)}
                                        sx={{ mb: 3, mt: 1 }}
                                    />
                                </div>) : (<div style={{ fontSize: 14 }}>{data.address}</div>)}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E8EB', padding: 16 }}>
                            <div style={{ flex: 1, paddingRight: 16 }}>
                                <div style={{ fontSize: 14, color: '#617A8A' }}>Phone number</div>
                                {isEditPage ? (<div>
                                    <TextField
                                        fullWidth
                                        name="phoneNumber"
                                        label=""
                                        defaultValue={data.phoneNumber}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => insertUpdateData("phoneNumber", e.target.value)}
                                        sx={{ mb: 3, mt: 1 }}
                                    />
                                </div>) : (<div style={{ fontSize: 14 }}>{data.phoneNumber}</div>)}

                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, color: '#617A8A' }}>Date of Birth</div>
                                {isEditPage ? (<div>
                                    <TextField
                                        fullWidth
                                        name="dob"
                                        label=""
                                        defaultValue={data.dob}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => insertUpdateData("dob", e.target.value)}
                                        sx={{ mb: 3, mt: 1 }}
                                    />
                                </div>) : (<div style={{ fontSize: 14 }}>{data.dob}</div>)}

                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E8EB', padding: 16 }}>
                            <div style={{ flex: 1, paddingRight: 16 }}>
                                <div style={{ fontSize: 14, color: '#617A8A' }}>Email</div>
                                <div style={{ fontSize: 14 }}>{data.email}</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: 16, display: 'flex', gap: 15 }}>
                        {!isEditPage ? (
                            <>
                                <Button onClick={() => setEditPage(true)} variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                                    <div style={{ fontSize: 14, fontWeight: '700' }}>Edit Admin Details</div>
                                </Button>
                                <Button onClick={handleClickOpen} variant="contained" color="info" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                                    <div style={{ fontSize: 14, fontWeight: '700' }}>Change Password</div>
                                </Button>
                                <Button onClick={handleDisableAccount} variant="contained" color="secondary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                                    <div style={{ fontSize: 14, fontWeight: '700' }}>Disable Account</div>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => { setEditPage(false); handleSaveDetail() }} variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                                    <div style={{ fontSize: 14, fontWeight: '700' }}>Save Details</div>
                                </Button>
                                <Button onClick={() => setEditPage(false)} variant="contained" color="secondary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                                    <div style={{ fontSize: 14, fontWeight: '700' }}>Cancel</div>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Card>
            <ChangePasswordDialog open={open} handleClose={handleClose} />
        </DashboardContent>
    );
}
