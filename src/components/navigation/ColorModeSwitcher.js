import classes from './ColorModeSwitcher.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';
import { colorModeActions } from '../../store/colormode-slice';
import { useSelector } from 'react-redux';

const handleColorMode = (variable, value, variableTwo, valueTwo) => {
  document.documentElement.style.setProperty(variable, value);
  document.documentElement.style.setProperty(variableTwo, valueTwo);
};

const ColorModeSwitcher = () => {
  const dispatch = useDispatch();
  const isColorModeWhite = useSelector(
    (state) => state.colorMode.colorModeWhite
  );

  const colorModeIcon = isColorModeWhite ? (
    <FontAwesomeIcon icon={faSun} />
  ) : (
    <FontAwesomeIcon icon={faMoon} />
  );

  const toggleColorMode = () => {
    dispatch(colorModeActions.toggle());
  };

  isColorModeWhite
    ? handleColorMode('--white-color', '#ffffff', '--text-color', '#333333')
    : handleColorMode('--white-color', '#000000', '--text-color', '#ffffff');

  return (
    <div className={classes.colorModeSwitcher} onClick={toggleColorMode}>
      <div
        className={`
          ${classes.colorModeToggler}
          ${isColorModeWhite ? '' : classes.changeColorMode}
        `}
      ></div>
      <div className={classes.iconsContainer}>{colorModeIcon}</div>
    </div>
  );
};

export default ColorModeSwitcher;
