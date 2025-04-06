import { Button, Card, TextField } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditIconSVG from 'src/components/editIconSVG';
import Api, { address } from 'src/helpers/Api';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function BusinessDetailView() {
  const { businessId } = useParams();

  const dataPrep = {
    id: businessId,
    name: "Business Name",
    address: "Singapore Clementi Mall",
    isOperational: true,
    status: true,
    entityType: "",
    businessType: "",
    businessDescription: "",
    phone: "",
    website: "",
    email: "",
    password: "",
    profilePicture: "",
  };

  const [data, setData] = useState(dataPrep);
  const [updateData, setUpdateData] = useState({});
  const [isEditPage, setEditPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const fetchProfileData = useCallback(() => {
    Api.getBusinessById(businessId)
      .then((res) => {
        if (res.status === 404) throw new Error("Unauthorized");
        return res.json();
      })
      .then((json) => {
        setData(json.business);
        console.log("Profile data fetched successfully:", json);
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message);
      });
  }, [businessId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const insertUpdateData = (attributeName: string, value: any) => {
    setUpdateData((prev) => ({ ...prev, [attributeName]: value }));
  }

  const handleSaveDetail = () => {
    Api.updateBusinessProfile(updateData, profileImage, businessId).then((res) => {
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
    // Disable account
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
        <div style={{ width: 908, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ width: '100%', padding: 16, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 288, display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#121417', fontSize: 32, fontWeight: '700', lineHeight: '40px' }}>Business Profile</div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>Business Profile</div>
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
                  {isEditPage ? (<></>) : (<div style={{ fontSize: 16, color: '#617A8A' }}>{data.address}</div>)}
                  {isEditPage ? (<div>
                    <TextField
                      fullWidth
                      name="businessType"
                      label="Business Type"
                      defaultValue={data.businessType}
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 3, mt: 1 }}
                      onChange={(e) => insertUpdateData("businessType", e.target.value)}
                    />
                  </div>) : (<div style={{ fontSize: 16, color: '#617A8A' }}>{data.businessType}</div>)}

                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>Business Details</div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Business name</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="name"
                    label=""
                    defaultValue={data.name}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("name", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.name}</div>)}

              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Business address</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="address"
                    label=""
                    defaultValue={data.address}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("address", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.address}</div>)}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Business phone number</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="phoneNumber"
                    label=""
                    defaultValue={data.phone}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("phoneNumber", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.phone}</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Website</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="website"
                    label=""
                    defaultValue={data.website}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("website", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>
                  <a href={`https://${data.website}`} target="_blank" rel="noopener noreferrer">{data.website}</a></div>)}
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
                    defaultValue={data.email}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("email", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.email}</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Password</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="password"
                    label=""
                    defaultValue={data.password}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                    onChange={(e) => insertUpdateData("password", e.target.value)}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.password}</div>)}
              </div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', gap: 15 }}>
            {!isEditPage ? (
              <>
                <Button onClick={() => setEditPage(true)} variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: '700' }}>Edit Business Details</div>
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
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

