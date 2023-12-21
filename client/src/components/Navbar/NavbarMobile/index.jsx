import PropTypes from 'prop-types';
import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Avatar, Menu, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';

import Button from '@components/Button';
import classes from './style.module.scss';

const NavbarMobile = ({
  links,
  navigate,
  user,
  onSelectLang,
  locale,
  handleTheme,
  theme,
  alignment,
  handleAlignment,
  handleLogout,
}) => {
  const location = useLocation();
  const [menuPosition, setMenuPosition] = useState(null);

  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  return (
    <div>
      <div onClick={handleClick}>
        <div className={classes.toggle}>
          <MenuIcon />
        </div>
      </div>
      <div className={classes.toolbar}>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem>
            <ToggleButtonGroup size="small" value={alignment} exclusive onChange={handleAlignment}>
              <ToggleButton
                value="left"
                aria-label="left aligned"
                onClick={() => onSelectLang('id')}
                selected={locale === 'id'}
              >
                <div className={classes.locale}>
                  <Avatar className={classes.avatar} src="/id.png" />
                  <div className={classes.lang}>ID</div>
                </div>
              </ToggleButton>
              <ToggleButton
                value="center"
                aria-label="centered"
                onClick={() => onSelectLang('en')}
                selected={locale === 'en'}
              >
                <div className={classes.locale}>
                  <Avatar className={classes.avatar} src="/en.png" />
                  <div className={classes.lang}>EN</div>
                </div>
              </ToggleButton>
            </ToggleButtonGroup>
          </MenuItem>
          <MenuItem onClick={handleTheme}>
            <div className={classes.theme} data-testid="toggleTheme">
              {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
              <div>{theme === 'light' ? 'Light' : 'Dark'}</div>
            </div>
          </MenuItem>
          {Object.keys(user).length > 0 && (
            <MenuItem onClick={() => navigate('/profile')}>
              <div className={classes.userNav}>
                <img className={classes.imgUser} src={user.image} alt={user.firstName} />
                {user.firstName}
              </div>
            </MenuItem>
          )}
          {links?.map((link, idx) => (
            <MenuItem key={idx}>
              <Link
                className={location.pathname !== link.href ? classes.link : `${classes.link} ${classes.active}`}
                key={link.id}
                to={link.href}
              >
                <FormattedMessage id={link.name} />
              </Link>
            </MenuItem>
          ))}
          {Object.keys(user).length > 0 ? (
            <MenuItem>
              <Button className={classes.btn} onClick={() => handleLogout()}>
                <FormattedMessage id="navbar_link_merchant_logout" />
              </Button>
            </MenuItem>
          ) : (
            <>
              <MenuItem>
                <Button className={classes.btn} onClick={() => navigate('/auth')}>
                  <FormattedMessage id="app_login_title" />
                </Button>
              </MenuItem>
              <MenuItem>
                <Button className={classes.btn} onClick={() => navigate('/auth/merchant')}>
                  <FormattedMessage id="app_login_title_merchant" />
                </Button>
              </MenuItem>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

NavbarMobile.propTypes = {
  navigate: PropTypes.func,
  user: PropTypes.object,
  onSelectLang: PropTypes.func,
  locale: PropTypes.string,
  handleTheme: PropTypes.func,
  theme: PropTypes.string,
  alignment: PropTypes.string,
  handleAlignment: PropTypes.func,
  links: PropTypes.array,
  handleLogout: PropTypes.func,
};

export default NavbarMobile;
