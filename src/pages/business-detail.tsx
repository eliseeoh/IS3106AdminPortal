import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import Api from 'src/helpers/Api';
import { BusinessDetailView, Profile } from 'src/sections/businessDetail/view';

// ----------------------------------------------------------------------

export default function Page() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const { businessId } = useParams();

    const handleFetchProfile = useCallback(() => {
        Api.getBusinessById(businessId)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Error fetching Business By Id: ${res}`);
            })
            .then(data => {
                console.log(data);
                setProfile(data.business);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [businessId]);

    useEffect(() => {
        handleFetchProfile();
    }, [handleFetchProfile])



    if (!profile) { return null; }

    return (
        <>
            <Helmet>
                <title> {`User Detail - ${CONFIG.appName}`}</title>
            </Helmet>

            <BusinessDetailView profile={profile} handleFetchProfile={handleFetchProfile} />
        </>
    );
}
