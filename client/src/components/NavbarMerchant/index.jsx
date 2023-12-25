import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useMediaQuery } from '@mui/material';

import classes from './style.module.scss';
import NavbarMobile from './NavbarMobile';

const NavbarMerchant = ({ merchant, links, handleTheme, theme, handleParams }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const goTo = (href) => {
    handleParams(href);
    navigate(href);
  };

  if (isMobile) {
    return <NavbarMobile merchant={merchant} links={links} handleTheme={handleTheme} handleParams={handleParams} />;
  }

  return (
    <div className={classes.navbar}>
      <div className={classes.profileNavbar}>{merchant.name}</div>
      <div className={classes.navbarContent}>
        <div className={classes.link} data-testid="toggleTheme" onClick={handleTheme}>
          {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          <div>{theme === 'light' ? 'Light' : 'Dark'}</div>
        </div>
        {links.map((item) => (
          <div key={item.id} className={classes.link} onClick={() => goTo(item.href)}>
            {item.icon}
            <FormattedMessage id={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

NavbarMerchant.propTypes = {
  merchant: PropTypes.object,
  links: PropTypes.array,
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  handleParams: PropTypes.func,
};

export default NavbarMerchant;
