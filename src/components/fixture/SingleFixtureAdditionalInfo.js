import { useSelector } from 'react-redux';

import classes from './SingleFixtureClasses.module.css';

import whistleIcon from '../../../src/images/whistle_icon.svg';
import stadiumIcon from '../../../src/images/stadium_icon.svg';
import locationIcon from '../../../src/images/location_icon.svg';

const SingleFixtureAdditionalInfo = () => {
  const singleFixture = useSelector((state) => state.fixture.selectedFixture);

  return (
    <div className={`fixturePadding`}>
      <div
        className={`${classes.halfTime} flexRowSpace ${classes.paddingEl} statsMargin`}
      >
        <p>Additional Information:</p>
      </div>
      {singleFixture.fixture?.referee && (
        <div
          className={`${classes.fixtureEventWrapper} ${classes.paddingEl} statsMargin flexRowSpace`}
        >
          <div className="flexRowCenter">
            <img
              src={whistleIcon}
              alt="Whistle icon"
              className={classes.iconMargin}
            />
            <p>Referee</p>
          </div>
          <p>{singleFixture.fixture.referee}</p>
        </div>
      )}
      {singleFixture.fixture?.venue.name && (
        <div
          className={`${classes.fixtureEventWrapper} ${classes.paddingEl} statsMargin flexRowSpace`}
        >
          <div className="flexRowCenter">
            <img
              src={stadiumIcon}
              alt="Stadium icon"
              className={classes.iconMargin}
            />
            <p>Stadium</p>
          </div>
          <p>{singleFixture.fixture.venue.name}</p>
        </div>
      )}
      {singleFixture.fixture?.venue.city && (
        <div
          className={`${classes.fixtureEventWrapper} ${classes.paddingEl} flexRowSpace`}
        >
          <div className="flexRowCenter">
            <img
              src={locationIcon}
              alt="Location"
              className={classes.iconMargin}
            />
            <p>Location</p>
          </div>
          <p>{singleFixture.fixture.venue.city}</p>
        </div>
      )}
    </div>
  );
};
export default SingleFixtureAdditionalInfo;
