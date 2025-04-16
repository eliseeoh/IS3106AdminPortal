import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import Api from 'src/helpers/Api';
import { Profile, UserDetailView } from 'src/sections/userDetail/view';

// ----------------------------------------------------------------------

export default function Page() {

    const [profile, setProfile] = useState<Profile | null>(null);
    const { userId } = useParams();

    const handleFetchProfile = useCallback(() => {
        Api.getUserById(userId)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Error fetching User By Id: ${res}`);
            })
            .then(data => {
                console.log(data)
                setProfile(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [userId]);

    useEffect(() => {
        handleFetchProfile();
    }, [handleFetchProfile])

    if (!profile) { return null; }

    return (
        <>
            <Helmet>
                <title> {`User Detail - ${CONFIG.appName}`}</title>
            </Helmet>

            <UserDetailView profile={profile} handleFetchProfile={handleFetchProfile} />
        </>
    );
}
