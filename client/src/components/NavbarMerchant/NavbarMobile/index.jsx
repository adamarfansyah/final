import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import classes from './style.module.scss';

const NavbarMobile = ({ merchant, links, handleTheme, theme, handleParams }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const goTo = (href) => {
    handleParams(href);
    navigate(href);
  };

  const handleOpen = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div className={classes.navbar}>
      {/* <div className={classes.profileNavbar}>{merchant.name}</div> */}
      <div className={classes.navbarContent}>
        <div className={classes.link} data-testid="toggleTheme" onClick={handleTheme}>
          {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          {/* <div>{theme === 'light' ? 'Light' : 'Dark'}</div> */}
        </div>
        {links.map((item) => (
          <div key={item.id} className={classes.link} onClick={() => goTo(item.href)}>
            {item.icon}
            {/* <FormattedMessage id={item.name} /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

NavbarMobile.propTypes = {
  merchant: PropTypes.object,
  links: PropTypes.array,
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  handleParams: PropTypes.func,
};

export default NavbarMobile;
