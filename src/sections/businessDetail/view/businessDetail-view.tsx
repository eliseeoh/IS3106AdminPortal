import { Button, Card, TextField } from '@mui/material';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import EditIconSVG from 'src/components/editIconSVG';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function BusinessDetailView() {
  const { businessId } = useParams();

  const data = {
    id: businessId,
    name: "Business Name",
    location: "Singapore Clementi Mall",
    isOperational: true,
    status: true,
    avatarUrl: "/assets/images/avatar/avatar-1.webp",
    isUserOrBusiness: false,
    businessType: "Arts and Craft",
    businessDescription: "Business description",
    phoneNumber: "123-456-7890",
    websiteUrl: "www.openjio.com",
    email: "business@gmai.com",
    password: "password",
  };

  const [isEditPage, setEditPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showFileInput, setShowFileInput] = useState(false);

  const handleSaveDetail = () => {

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
                  <img src={selectedImage || data.avatarUrl} alt="Business Avatar" style={{ width: '100%', height: '100%', borderRadius: 12, objectFit: "cover" }} />
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
                  {isEditPage ? (<></>) : (<div style={{ fontSize: 16, color: '#617A8A' }}>{data.location}</div>)}
                  {isEditPage ? (<div>
                    <TextField
                      fullWidth
                      name="businessType"
                      label="Business Type"
                      defaultValue={data.businessType}
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 3, mt: 1 }}
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
                    defaultValue={data.location}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.location}</div>)}
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
                    defaultValue={data.phoneNumber}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.phoneNumber}</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Website</div>
                {isEditPage ? (<div>
                  <TextField
                    fullWidth
                    name="websiteUrl"
                    label=""
                    defaultValue={data.websiteUrl}
                    InputLabelProps={{ shrink: true }}
                    sx={{ mb: 3, mt: 1 }}
                  />
                </div>) : (<div style={{ fontSize: 14 }}>{data.websiteUrl}</div>)}
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

