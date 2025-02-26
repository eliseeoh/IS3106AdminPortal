import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { UserDetailView } from 'src/sections/userDetail/view';

// ----------------------------------------------------------------------

export default function Page() {

    return (
        <>
            <Helmet>
                <title> {`User Detail - ${CONFIG.appName}`}</title>
            </Helmet>

            <UserDetailView />
        </>
    );
}
