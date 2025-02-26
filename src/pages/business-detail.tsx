import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { BusinessDetailView } from 'src/sections/businessDetail/view';

// ----------------------------------------------------------------------

export default function Page() {

    return (
        <>
            <Helmet>
                <title> {`User Detail - ${CONFIG.appName}`}</title>
            </Helmet>

            <BusinessDetailView />
        </>
    );
}
