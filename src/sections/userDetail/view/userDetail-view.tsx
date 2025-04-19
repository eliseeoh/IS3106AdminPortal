import { Button, Card, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditIconSVG from 'src/components/editIconSVG';
import Api, { address } from 'src/helpers/Api';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const secondsDiff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsDiff < 60) {
    return `${secondsDiff} second${secondsDiff !== 1 ? 's' : ''} ago`;
  }
  if (secondsDiff < 3600) {
    const minutes = Math.floor(secondsDiff / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  }
  if (secondsDiff < 86400) {
    const hours = Math.floor(secondsDiff / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  if (secondsDiff < 31536000) {
    const days = Math.floor(secondsDiff / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }

  const years = Math.floor(secondsDiff / 31536000);
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}

export type Profile = {
  _id: string; //
  name: string; //
  address: string; //
  password: string,
  dob: string,
  status: boolean;
  entityType: string; //
  credits: number;
  phone: string; //
  email: string; //
  profilePicture: string; //
  directions: string;
  createdAt: Date;
};


export function UserDetailView({ profile, handleFetchProfile }: { profile: any, handleFetchProfile: () => void }) {
  const [updateData, setUpdateData] = useState({});
  const [isEditPage, setEditPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const navigate = useNavigate();

  const insertUpdateData = (attributeName: string, value: any) => {
    setUpdateData((prev) => ({ ...prev, [attributeName]: value }));
  }

  const handleSaveDetail = () => {
    console.log("updateData", updateData);
    Api.updateUserProfile(updateData, profileImage, profile._id).then((res) => {
      if (res.status === 404) {
        throw new Error("Unauthorized");
      }
      handleFetchProfile();
    }).catch((error) => {
      console.error(error.message);
      alert(error.message); // Optionally show an alert to the user
    });
  }

  const handleEnableDisableAccount = async () => {
    if (profile.status) {
      await Api.disableUserAccount(profile._id)
        .then(res => {
          if (!res.ok) {
            throw new Error("Error enabling account");
          }
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      await Api.enableUserAccount(profile._id)
        .then(res => {
          if (!res.ok) {
            throw new Error("Error enabling account");
          }
        })
        .catch(err => {
          console.error(err);
        })
    }
    handleFetchProfile();
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
      <Card style={{ margin: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ width: '100%', padding: 16, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 288, display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#121417', fontSize: 32, fontWeight: '700', lineHeight: '40px' }}>User Profile</div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>User Profile</div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ position: 'relative', width: 128, height: 128, backgroundColor: '#ccc', borderRadius: 12 }}>
                  <img src={selectedImage || `http://localhost:3000/${profile.profilePicture}`} alt="Business Avatar" style={{ width: '100%', height: '100%', borderRadius: 12, objectFit: "cover" }} />
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
                  <div style={{ fontSize: 22, fontWeight: '700' }}>{profile.name}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>Additional Actions</div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
              <Button onClick={() => { navigate(`bookings`) }} variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none', maxHeight: 40 }}>
                <div style={{ fontSize: 14, fontWeight: '700' }}>View All Bookings</div>
              </Button>
            </div>
          </div>

          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>User Details</div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Account Creation Date</div>
                <div style={{ fontSize: 14 }}>{profile.createdAt.substring(0, 10)}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Status</div>
                <div style={{ fontSize: 14 }}>{profile.status ? "Valid ✅" : "Invalid ❌"}</div>
              </div>
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Business name</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="name"
                    label=""
                    defaultValue={profile.name}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("name", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{profile.name}</div>)}

              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Address</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="address"
                    label=""
                    defaultValue={profile.address}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("address", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{profile.address}</div>)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Phone Number</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    label=""
                    defaultValue={profile.phoneNumber}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("phoneNumber", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{profile.phoneNumber}</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Date of Birth</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="dob"
                    label=""
                    defaultValue={profile.dob}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("dob", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{profile.dob}</div>)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Email</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="email"
                    label=""
                    defaultValue={profile.email}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("email", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{profile.email}</div>)}
              </div>
              {/* <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Password</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="password"
                    label=""
                    defaultValue={profile.password}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("password", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{profile.password}</div>)}
              </div> */}
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', gap: 15 }}>
            {!isEditPage ? (
              <>
                <Button onClick={() => setEditPage(true)} variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: '700' }}>Edit Business Details</div>
                </Button>

                <Button onClick={handleEnableDisableAccount} variant="contained" color={profile.status ? "error" : "success"} style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: '700' }}>{profile.status ? "Disable Account" : "Enable Account"}</div>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => { setEditPage(false); handleSaveDetail() }} variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: '700' }}>Save Details</div>
                </Button>
                <Button onClick={() => { setEditPage(false); }} variant="contained" color="secondary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: '700' }}>Cancel</div>
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </DashboardContent >
  );
}

// ----------------------------------------------------------------------

