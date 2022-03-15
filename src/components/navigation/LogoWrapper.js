import { Link } from 'react-router-dom';

import classes from './LogoWrapper.module.css';
import logo from '../../images/football-ball-logo.svg';

const LogoWrapper = () => {
  return (
    <Link className={`flexRow ${classes.logoWrapper}`} to={'/'}>
      <img src={logo} alt="Football stats logo" />
      <p>
        <span>C</span>heck <span>T</span>he <span>S</span>tats
      </p>
    </Link>
  );
};

export default LogoWrapper;
