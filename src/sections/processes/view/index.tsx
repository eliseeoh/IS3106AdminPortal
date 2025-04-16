import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { DashboardContent } from 'src/layouts/dashboard';
import { Button, Card, TextField } from '@mui/material';
import EditIconSVG from 'src/components/editIconSVG';
import Api from 'src/helpers/Api';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export type subscriptionProps = {
    Basic_Tier: {
        credits: number;
        price: number;
    };
    Standard_Tier: {
        credits: number;
        price: number;
    };
    Premium_Tier: {
        credits: number;
        price: number;
    };
};


export function ProcessesView() {
    const [subscriptionForm, setSubscriptionForm] = useState<subscriptionProps>({
        Basic_Tier: {
            credits: 0,
            price: 0,
        },
        Standard_Tier: {
            credits: 0,
            price: 0,
        },
        Premium_Tier: {
            credits: 0,
            price: 0,
        },
    });
    const [displayData, setDisplayData] = useState<subscriptionProps | null>(null);
    const router = useRouter();
    useEffect(() => {
        Api.getSubscription().then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to fetch subscription data');
        }
        ).then((data) => {
            const normalizedSubscription: subscriptionProps = {
                Basic_Tier: data.Basic_Tier,
                Standard_Tier: data.Standard_Tier,
                Premium_Tier: data.Premium_Tier,
            };

            setSubscriptionForm(normalizedSubscription);
            setDisplayData(normalizedSubscription);
        })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleSaveDetail = () => {
        const formattedData = {
            subscription: {
                "Basic_Tier": {
                    credits: subscriptionForm.Basic_Tier.credits,
                    price: subscriptionForm.Basic_Tier.price,
                },
                "Standard_Tier": {
                    credits: subscriptionForm.Standard_Tier.credits,
                    price: subscriptionForm.Standard_Tier.price,
                },
                "Premium_Tier": {
                    credits: subscriptionForm.Premium_Tier.credits,
                    price: subscriptionForm.Premium_Tier.price,
                },
            },
        };
        Api.updateSubscription(formattedData.subscription).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to update subscription data');
        }
        ).then((data) => {
            setSubscriptionForm(data);
            setDisplayData(data);
            router.refresh();
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const [isEditPage, setEditPage] = useState(false);
    if (!displayData || !displayData.Basic_Tier || !displayData.Standard_Tier || !displayData.Premium_Tier) {
        return <CircularProgress size="3rem" />;
    }


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
                                            name="basic_credits"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                            value={subscriptionForm.Basic_Tier.credits}
                                            onChange={(e) =>
                                                setSubscriptionForm((prev) => ({
                                                    ...prev,
                                                    Basic_Tier: { ...prev.Basic_Tier, credits: Number(e.target.value) },
                                                }))
                                            }
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{displayData.Basic_Tier.credits}</div>)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Price</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="basic_price"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                            value={subscriptionForm.Basic_Tier.price}
                                            onChange={(e) =>
                                                setSubscriptionForm((prev) => ({
                                                    ...prev,
                                                    Basic_Tier: { ...prev.Basic_Tier, price: Number(e.target.value) },
                                                }))
                                            }
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{displayData.Basic_Tier.price}</div>)}
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
                                            name="standard_credits"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                            value={subscriptionForm.Standard_Tier.credits}
                                            onChange={(e) =>
                                                setSubscriptionForm((prev) => ({
                                                    ...prev,
                                                    Standard_Tier: { ...prev.Standard_Tier, credits: Number(e.target.value) },
                                                }))
                                            }
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{displayData.Standard_Tier.credits}</div>)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Price</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="standard_price"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                            value={subscriptionForm.Standard_Tier.price}
                                            onChange={(e) =>
                                                setSubscriptionForm((prev) => ({
                                                    ...prev,
                                                    Standard_Tier: { ...prev.Standard_Tier, price: Number(e.target.value) },
                                                }))
                                            }
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{displayData.Standard_Tier.price}</div>)}
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
                                            name="premium_credits"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                            value={subscriptionForm.Premium_Tier.credits}
                                            onChange={(e) =>
                                                setSubscriptionForm((prev) => ({
                                                    ...prev,
                                                    Premium_Tier: { ...prev.Premium_Tier, credits: Number(e.target.value) },
                                                }))
                                            }
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{displayData.Premium_Tier.credits}</div>)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, color: '#617A8A' }}>Price</div>
                                    {isEditPage ? (<div>
                                        <TextField
                                            fullWidth
                                            name="premium_price"
                                            InputLabelProps={{ shrink: true }}
                                            sx={{ mb: 3, mt: 1 }}
                                            value={subscriptionForm.Premium_Tier.price}
                                            onChange={(e) =>
                                                setSubscriptionForm((prev) => ({
                                                    ...prev,
                                                    Premium_Tier: { ...prev.Premium_Tier, price: Number(e.target.value) },
                                                }))
                                            }
                                        />
                                    </div>) : (<div style={{ fontSize: 14 }}>{displayData.Premium_Tier.price}</div>)}
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
