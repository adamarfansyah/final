import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createStructuredSelector } from 'reselect';

import { setTheme } from '@containers/App/actions';
import { selectLocale, selectTheme } from '@containers/App/selectors';

import Navbar from '@components/Navbar';
import dcryptToken from '@utils/dcryptToken';
import { selectToken, selectTokenMerchant } from '@containers/Client/selectors';
import NavbarMerchant from '@components/NavbarMerchant';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FestivalIcon from '@mui/icons-material/Festival';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import MerchantAdmin from '@pages/MerchantAdmin';
import classes from './style.module.scss';

const LINKS = [
  {
    id: 1,
    name: 'navbar_link_home',
    href: '/',
  },
  {
    id: 2,
    name: 'navbar_link_venue',
    href: '/venue',
  },
  {
    id: 3,
    name: 'navbar_link_merchant',
    href: '/merchant',
  },
];

const LINKS_MERCHANT = [
  {
    id: 1,
    name: 'navbar_link_merchant_profile',
    href: '/merchant/profile',
    icon: <AccountCircleIcon />,
  },
  {
    id: 2,
    name: 'navbar_link_merchant_venue',
    href: '/merchant/venue',
    icon: <FestivalIcon />,
  },
  {
    id: 5,
    name: 'navbar_link_merchant_transaction',
    href: '/merchant/transaction',
    icon: <ReceiptLongIcon />,
  },
  {
    id: 3,
    name: 'navbar_link_merchant_logout',
    href: '/merchant/logout',
    icon: <LogoutIcon />,
  },
];

const MainLayout = ({ children, locale, token, tokenMerchant, theme, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [, setHasParams] = useState('dashboard');
  const decodedToken = (token !== null && dcryptToken(token)) || {};
  const decodedTokenMerchant = (tokenMerchant !== null && dcryptToken(tokenMerchant)) || {};

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const handleParams = (params) => {
    setHasParams(params);
  };

  if (tokenMerchant) {
    return (
      <div className={classes.navbarMerchant}>
        <NavbarMerchant
          merchant={decodedTokenMerchant}
          links={LINKS_MERCHANT}
          handleTheme={handleTheme}
          theme={theme}
          handleParams={handleParams}
        />
        <MerchantAdmin merchant={decodedTokenMerchant} />
      </div>
    );
  }

  return (
    <div>
      <Navbar
        links={LINKS}
        user={decodedToken}
        title={formatMessage({ id: 'app_title_header' })}
        locale={locale}
        theme={theme}
        handleTheme={handleTheme}
      />
      {children}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  locale: selectLocale,
  theme: selectTheme,
  token: selectToken,
  tokenMerchant: selectTokenMerchant,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
  token: PropTypes.string,
  tokenMerchant: PropTypes.string,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
