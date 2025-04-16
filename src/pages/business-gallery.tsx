
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import Api from 'src/helpers/Api';
import { Profile } from 'src/sections/businessDetail/view/businessDetail-view';
import { BusinessGalleryView } from 'src/sections/businessGallery';

// ----------------------------------------------------------------------

export default function GalleryPage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const { businessId } = useParams();
    const [gallery, setGallery] = useState<string[]>([]);

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
                setGallery(data.business.gallery);
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
                <title> {`Gallery - ${CONFIG.appName}`}</title>
            </Helmet>

            <BusinessGalleryView profile={profile} gallery={gallery} handleFetchProfile={handleFetchProfile} />
        </>
    );
}