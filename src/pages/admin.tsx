import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AdminView } from 'src/sections/admin/view';
// ----------------------------------------------------------------------

export default function AdminDetailPage() {
  return (
    <>
      <Helmet>
        <title> {`Admins - ${CONFIG.appName}`}</title>
      </Helmet>

      <AdminView />
    </>
  );
}
