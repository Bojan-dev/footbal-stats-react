import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';
import LogoWrapper from './LogoWrapper';
import CurrentTime from './CurrentTime';
import ColorModeSwitcher from './ColorModeSwitcher';

import { useSelector } from 'react-redux';

const Navigation = () => {
  const isColorModeWhite = useSelector((state) => state.colorMode.colorIsWhite);

  return (
    <header className={!isColorModeWhite && classes.headerDarkMode}>
      <div>
        <LogoWrapper />
        <div className={`flexRow ${classes.rightRow}`}>
          <CurrentTime />
          <div />
          <input
            className={classes.searchBar}
            type="text"
            placeholder="Search..."
          />
          <div />
          <button className="mainBtn">SIGN IN</button>
          <button className="secondaryBtn">SIGN UP</button>
        </div>
        <ColorModeSwitcher />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activePage : classes.nonActivePage
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activePage : classes.nonActivePage
              }
              to="/fixtures"
            >
              Fixtures
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activePage : classes.nonActivePage
              }
              to="/players"
            >
              Players
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activePage : classes.nonActivePage
              }
              to="/teams"
            >
              Teams
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activePage : classes.nonActivePage
              }
              to="/transfers"
            >
              Transfers
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activePage : classes.nonActivePage
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
