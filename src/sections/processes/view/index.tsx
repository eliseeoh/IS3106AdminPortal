import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { Button, Card, TextField } from '@mui/material';
import EditIconSVG from 'src/components/editIconSVG';

// ----------------------------------------------------------------------

export function ProcessesView() {
    const subscriptionData = {
        basic_credit: 40,
        basic_price: 30,
        standard_credit: 90,
        standard_price: 70,
        premium_credit: 100,
        premium_price: 150,
    }

    const handleSaveDetail = () => {

    }

    const [isEditPage, setEditPage] = useState(false);

    return (
        <DashboardContent>
            <Card>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ width: '100%', padding: 16, display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ color: '#121417', fontSize: 32, fontWeight: '700', lineHeight: '40px' }}>Wyd? Company Processes</div>
                        </div>
                    </div>

                    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" >Subscription</Typography>
                    </div>

                    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1" style={{ textDecoration: 'underline' }}>Basic Tier</Typography>
                        <div style={{ borderBottom: '1px solid #E5E8EB', padding: 16 }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: 1, paddingRight: 16 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Credits</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            label=""
                                            defaultValue={subscriptionData.basic_credit}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{subscriptionData.basic_credit}</div>)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Price</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="address"
                                            label=""
                                            defaultValue={subscriptionData.basic_price}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{subscriptionData.basic_price}</div>)}
                                </div>
                            </div>
                        </div>
                        <Typography variant="body1" style={{ textDecoration: 'underline' }}>Standard Tier</Typography>
                        <div style={{ borderBottom: '1px solid #E5E8EB', padding: 16 }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: 1, paddingRight: 16 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Credits</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            label=""
                                            defaultValue={subscriptionData.standard_credit}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{subscriptionData.standard_credit}</div>)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Price</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="address"
                                            label=""
                                            defaultValue={subscriptionData.standard_price}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{subscriptionData.standard_price}</div>)}
                                </div>
                            </div>
                        </div>
                        <Typography variant="body1" style={{ textDecoration: 'underline' }}>Premium Tier</Typography>
                        <div style={{ borderBottom: '1px solid #E5E8EB', padding: 16 }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: 1, paddingRight: 16 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Credits</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            label=""
                                            defaultValue={subscriptionData.premium_credit}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{subscriptionData.premium_credit}</div>)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Price</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="address"
                                            label=""
                                            defaultValue={subscriptionData.premium_price}
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{subscriptionData.premium_price}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: 16, display: 'flex', gap: 15 }}>
                        {!isEditPage ? (
                            <>
                                <Button onClick={() => setEditPage(true)} variant="contained" color="primary" style={{ padding: '12px 24px', borderRadius: 8, textTransform: 'none' }}>
                                    <div style={{ fontSize: 14, fontWeight: '700' }}>Edit Details</div>
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
