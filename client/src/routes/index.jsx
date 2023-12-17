import MainLayout from '@layouts/MainLayout';

import Home from '@pages/Home';
import NotFound from '@pages/NotFound';
import Auth from '@pages/Auth';
import Venue from '@pages/Venue';
import Direction from '@pages/Direction';
import AuthMerchant from '@pages/AuthMerchant';
import MerchantAdmin from '@pages/MerchantAdmin';
import MerchantDetail from '@pages/MerchantDetail';
import VenueDetail from '@pages/Venue/VenueDetail';
import UserProfile from '@pages/UserProfile';
import ForgotPassword from '@pages/ForgotPassword';
import TransactionDetail from '@pages/TransactionDetail';
import UpdatePasswordUser from '@pages/UpdatePasswordUser';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/auth',
    name: 'Auth',
    protected: false,
    component: Auth,
    layout: MainLayout,
  },
  {
    path: '/auth/forgot-password',
    name: 'Auth Forgot Password',
    protected: false,
    component: ForgotPassword,
    layout: MainLayout,
  },
  {
    path: '/auth/update-forgot-password/:token',
    name: 'Auth Update Forgot Password',
    protected: false,
    component: UpdatePasswordUser,
    layout: MainLayout,
  },
  {
    path: '/venue',
    name: 'Venue',
    protected: false,
    component: Venue,
    layout: MainLayout,
  },
  {
    path: '/direction/:sLat/:sLong/:eLat/:eLong',
    name: 'Direction',
    protected: false,
    component: Direction,
    layout: MainLayout,
  },
  {
    path: '/auth/merchant',
    name: 'Auth Merchant',
    protected: false,
    component: AuthMerchant,
    layout: MainLayout,
  },
  {
    path: '/merchant/:params',
    protected: true,
    component: MerchantAdmin,
    layout: MainLayout,
  },
  {
    path: '/merchant-detail/:merchantId',
    protected: false,
    component: MerchantDetail,
    layout: MainLayout,
  },
  {
    path: '/venue/:venueId',
    protected: false,
    component: VenueDetail,
    layout: MainLayout,
  },
  {
    path: '/profile',
    protected: true,
    component: UserProfile,
    layout: MainLayout,
  },
  {
    path: '/transaction/:transactionId',
    protected: true,
    component: TransactionDetail,
    layout: MainLayout,
  },
  {
    path: '/forgot-password/user',
    protected: false,
    component: ForgotPassword,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
