import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ProcessesView } from 'src/sections/processes/view';

// ----------------------------------------------------------------------

export default function WydProcessesPage() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <ProcessesView />
    </>
  );
}
