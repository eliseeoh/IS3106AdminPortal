import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BusinessView } from 'src/sections/business/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Businesses - ${CONFIG.appName}`}</title>
      </Helmet>

      <BusinessView />
    </>
  );
}
