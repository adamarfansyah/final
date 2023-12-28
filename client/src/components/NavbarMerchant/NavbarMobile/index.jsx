import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import classes from './style.module.scss';

const NavbarMobile = ({ links, handleTheme, theme, handleParams }) => {
  const navigate = useNavigate();

  const goTo = (href) => {
    handleParams(href);
    navigate(href);
  };

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContent}>
        <div className={classes.link} data-testid="toggleTheme" onClick={handleTheme}>
          {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
        </div>
        {links.map((item) => (
          <div key={item.id} className={classes.link} onClick={() => goTo(item.href)}>
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

NavbarMobile.propTypes = {
  links: PropTypes.array,
  theme: PropTypes.string,
  handleTheme: PropTypes.func,
  handleParams: PropTypes.func,
};

export default NavbarMobile;
