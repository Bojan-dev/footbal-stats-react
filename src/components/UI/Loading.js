import classes from './Loading.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const Loading = () => {
  const isColorModeWhite = useSelector(
    (state) => state.colorMode.colorModeWhite
  );

  const loadingIcon = <FontAwesomeIcon size="2x" icon={faSyncAlt} />;

  return (
    <div
      className={
        isColorModeWhite
          ? classes.loadingIconWrapper
          : classes.loadingIconWrapperDark
      }
    >
      {loadingIcon}
    </div>
  );
};

export default Loading;
