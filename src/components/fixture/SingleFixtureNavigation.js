import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classes from './SingleFixtureNavigation.module.css';

let FIXTURE_TABS = ['Stats', 'Lineups', 'Head to Head', 'News', 'League table'];

const SingleFixtureStats = ({ params }) => {
  const selectedFixture = useSelector((state) => state.fixture.selectedFixture);

  const [fixtureTabs, setFixtureTabs] = useState([
    'Stats',
    'Lineups',
    'Head to Head',
    'News',
    'League table',
  ]);

  useEffect(() => {
    if (Object.keys(selectedFixture).length > 0) {
      //prettier-ignore
      selectedFixture.statistics[0]?.statistics
        ? setFixtureTabs(FIXTURE_TABS)
        : setFixtureTabs((prevState) =>
            prevState.filter((tab) => tab !== 'Stats')
          );
      selectedFixture.lineups.length > 0
        ? setFixtureTabs(FIXTURE_TABS)
        : setFixtureTabs((prevState) =>
            prevState.filter((tab) => tab !== 'Lineups')
          );
    }
  }, [selectedFixture]);

  return (
    <div>
      <div className={`flexRowSpace ${classes.fixtureStatsHeader}`}>
        <NavLink
          key={'summary'}
          className={({ isActive }) =>
            isActive
              ? `thirdColorBtn ${classes.activeStatBtn}`
              : `thirdColorBtn`
          }
          to={`/fixtures/${params}`}
          end
        >
          Summary
        </NavLink>
        {fixtureTabs.map((tab) => (
          <NavLink
            key={tab}
            className={({ isActive }) =>
              isActive
                ? `thirdColorBtn ${classes.activeStatBtn}`
                : `thirdColorBtn`
            }
            to={`/fixtures/${params}/${tab
              .toLocaleLowerCase()
              .replace(/\s+/g, '')}`}
          >
            {tab}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SingleFixtureStats;
