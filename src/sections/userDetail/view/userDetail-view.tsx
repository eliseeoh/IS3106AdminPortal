import { Button, Card } from '@mui/material';
import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardContent } from 'src/layouts/dashboard';

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


export function UserDetailView() {
  const { userId } = useParams();

  const [textDecorationColor, setTextDecorationColor] = useState('transparent');

  const data = {
    id: userId,
    name: "Stacy Lee",
    age: 25,
    status: true,
    avatarUrl: "/assets/images/avatar/avatar-1.webp",
    isUserOrBusiness: false,
    subscriptionType: "Basic Tier Plan",
    subscriptionStatus: true,
    address: "Parc Valley",
    phoneNumber: "123-456-7890",
    dob: "01/01/1996",
    topHistory: [
      {
        businessPic: "/assets/images/avatar/avatar-1.webp",
        business: "Tufting",
        date: "01/01/2022",
      },
      {
        businessPic: "/assets/images/avatar/avatar-3.webp",
        business: "Haxing",
        date: "01/01/2022",
      },
      {
        businessPic: "/assets/images/avatar/avatar-5.webp",
        business: "MiniGolf",
        date: "01/01/2022",
      },
    ],
  };

  return (
    <DashboardContent>
      <Card>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
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
                <div style={{ width: 128, height: 128, backgroundColor: '#ccc', borderRadius: 12 }}>
                  <img src={data.avatarUrl} alt="Business Avatar" style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 22, fontWeight: '700' }}>{data.name}</div>
                  <div style={{ fontSize: 16, color: '#617A8A' }}>{data.age} years old</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>History</div>
          </div>
          {data.topHistory.map((history, index) => (
            <div key={index} style={{ width: '100%', paddingLeft: 16, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', borderTop: '1px solid #E5E8EB', padding: 16 }}>
                <div style={{ width: 50, height: 50, backgroundColor: '#ccc', borderRadius: 12, marginRight: 16 }}>
                  <img src={history.businessPic} alt="Business Avatar" style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{history.business}</div>
                  <div style={{ fontSize: 14, color: '#617A8A' }}>{timeAgo(history.date)} · {history.date}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ width: '100%', padding: 16, display: 'flex', justifyContent: 'end' }}>
            <Button
              variant="text"
              style={{
                textTransform: 'none',
                fontSize: 14,
                fontWeight: '700',
                textDecoration: 'underline',
                textDecorationColor,
                transition: 'text-decoration-color 0.3s',
                color: 'grey',
              }}
              onMouseEnter={() => setTextDecorationColor('inherit')}
              onMouseLeave={() => setTextDecorationColor('transparent')}
            >
              See All
            </Button>
          </div>

          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#121417', fontSize: 18, fontWeight: '700' }}>User Details</div>
          </div>

          <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Name</div>
                <div style={{ fontSize: 14 }}>{data.name}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Address</div>
                <div style={{ fontSize: 14 }}>{data.address}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E5E8EB', padding: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Phone number</div>
                <div style={{ fontSize: 14 }}>{data.phoneNumber}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: '#617A8A' }}>Date of Birth</div>
                <div style={{ fontSize: 14 }}>{data.dob}</div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', padding: 16, display: 'flex', gap: 15 }}>
            <Button variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
              <div style={{ fontSize: 14, fontWeight: '700' }}>Edit User Details</div>
            </Button>
            <Button variant="contained" color="secondary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
              <div style={{ fontSize: 14, fontWeight: '700' }}>Disable Account</div>
            </Button>
          </div>
        </div>
      </Card>
    </DashboardContent >
  );
}

// ----------------------------------------------------------------------

