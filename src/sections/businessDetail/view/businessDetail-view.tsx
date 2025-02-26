import { Button, Card } from '@mui/material';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
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
  };

  return (
    <DashboardContent>
      <Card>
        <div style={{ width: 908, height: 680, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                <div style={{ width: 128, height: 128, backgroundColor: '#ccc', borderRadius: 12 }}>
                  <img src={data.avatarUrl} alt="Business Avatar" style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 22, fontWeight: '700' }}>{data.name}</div>
                  <div style={{ fontSize: 16, color: '#617A8A' }}>{data.location}</div>
                  <div style={{ fontSize: 16, color: '#617A8A' }}>{data.businessType}</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>Business Details</div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Business name</div>
                <div style={{ fontSize: 14 }}>{data.name}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Business address</div>
                <div style={{ fontSize: 14 }}>{data.location}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Business phone number</div>
                <div style={{ fontSize: 14 }}>{data.phoneNumber}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Website</div>
                <div style={{ fontSize: 14 }}>{data.websiteUrl}</div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', gap: 15 }}>
            <Button style={{ padding: 12, background: '#F0F2F5', borderRadius: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: '700' }}>Edit Business details</div>
            </Button>
            <Button style={{ padding: 12, background: '#FFEEEE', borderRadius: 12, textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: '700' }}>Disable Account</div>
            </Button>
          </div>
        </div>
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

