import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Business',
    path: '/business',
    icon: icon('ic-user'),
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: icon('ic-user'),
  },
  {
    title: 'Company Processes',
    path: '/processes',
    icon: icon('ic-blog'),
  },
];
