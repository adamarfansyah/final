import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import MenuIcon from '@mui/icons-material/Menu';

import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { setLocale } from '@containers/App/actions';
import { logoutUser } from '@pages/Auth/actions';
import Button from '@components/Button';
import NavbarMobile from './NavbarMobile';
import classes from './style.module.scss';

const Navbar = ({ locale, user, theme, links, handleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [menuPosition, setMenuPosition] = useState(null);
  const [alignment, setAlignment] = useState('left');
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolling = window.scrollY > 100;
      setScrolling(isScrolling);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const open = Boolean(menuPosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goTo = (href) => {
    navigate(href);
  };

  const handleAlignment = (newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <div
      className={`${!scrolling ? classes.headerWrapper : `${classes.headerWrapper} ${classes.headerScrolling}`}`}
      data-testid="navbar"
    >
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={() => goTo('/')}>
          <img src="/logoPlayZone.png" alt="logo" className={classes.logo} />
          <div className={classes.title}>PlayZone Pro</div>
        </div>
        {!isMobile ? (
          <div className={classes.rightContent}>
            <div className={classes.menus}>
              {links?.map((link) => (
                <Link
                  className={location.pathname !== link.href ? classes.link : `${classes.link} ${classes.active}`}
                  key={link.id}
                  to={link.href}
                >
                  <FormattedMessage id={link.name} />
                </Link>
              ))}
              {user && user.id ? (
                <>
                  <Link
                    className={location.pathname !== '/profile' ? classes.link : `${classes.link} ${classes.active}`}
                    to="/profile"
                  >
                    <FormattedMessage id="navbar_link_merchant_profile" />
                  </Link>
                  <Button onClick={handleLogout}>
                    <FormattedMessage id="navbar_link_merchant_logout" />
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => goTo('/auth')}>
                    <FormattedMessage id="app_login_title" />
                  </Button>
                  <Button onClick={() => goTo('/auth/merchant')}>
                    <FormattedMessage id="app_login_title_merchant" />
                  </Button>
                </>
              )}
            </div>
            <div className={classes.toolbar}>
              <div onClick={handleClick}>
                <MenuIcon className={classes.toggle} />
              </div>
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
              </Menu>
            </div>
          </div>
        ) : (
          <NavbarMobile
            handleAlignment={handleAlignment}
            alignment={alignment}
            onSelectLang={onSelectLang}
            locale={locale}
            theme={theme}
            handleTheme={handleTheme}
            user={user}
            navigate={goTo}
            links={links}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {
  locale: PropTypes.string.isRequired,
  user: PropTypes.object,
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  links: PropTypes.array,
};

export default injectIntl(Navbar);
