import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { AdminDetailView } from 'src/sections/adminDetail/view';

// ----------------------------------------------------------------------

export default function Page() {

    return (
        <>
            <Helmet>
                <title> {`User Detail - ${CONFIG.appName}`}</title>
            </Helmet>

            <AdminDetailView />
        </>
    );
}
