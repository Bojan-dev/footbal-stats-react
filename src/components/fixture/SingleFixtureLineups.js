import { useSelector } from 'react-redux';

import SingleFixtureTeamLineup from './SingleFixtureTeamLineup';
import SingleFixtureFieldLineup from './SingleFixtureFieldLineup';

import classes from './SingleFixtureSummary.module.css';

import football_field from '../../images/football_field.svg';

const SingleFixtureLineups = () => {
  const selectedFixture = useSelector((state) => state.fixture.selectedFixture);

  const homeLineup =
    Object.keys(selectedFixture).length > 0 &&
    selectedFixture.lineups.length > 0
      ? selectedFixture.lineups[0]
      : null;
  const awayLineup =
    Object.keys(selectedFixture).length > 0 &&
    selectedFixture.lineups.length > 0
      ? selectedFixture.lineups[1]
      : null;

  return (
    Object.keys(selectedFixture).length > 0 &&
    (selectedFixture.lineups.length > 0 ? (
      <div className="fixturePadding">
        <div
          className={`${classes.halfTime} ${classes.paddingEl} flexRowSpaceStart statsMargin`}
        >
          <p className="textUnderline">{homeLineup.formation}</p>
          <p>Lineups</p>
          <p className="textUnderline">{awayLineup.formation}</p>
        </div>
        <div className={`flexRowSpaceStart ${classes.flexLineupConfig}`}>
          <SingleFixtureTeamLineup
            lineup={homeLineup.startXI}
            subs={homeLineup.substitutes}
            coach={homeLineup.coach}
            isHome={true}
          />
          <div className={classes.footballField}>
            <img
              className="width--max"
              src={football_field}
              alt="Football field"
            />
            {selectedFixture.lineups.map((lineup) => {
              const isHomeLineup =
                lineup.team.id === selectedFixture.teams.home.id;

              return (
                <SingleFixtureFieldLineup
                  key={lineup.team.id}
                  isHome={isHomeLineup}
                  players={lineup.startXI}
                  formation={lineup.formation}
                />
              );
            })}
          </div>
          <SingleFixtureTeamLineup
            lineup={awayLineup.startXI}
            subs={awayLineup.substitutes}
            coach={awayLineup.coach}
            isHome={false}
          />
        </div>
      </div>
    ) : (
      <div className="fixturePadding">
        <h4 className="textColorMode">
          No Lineups info for the selected fixture!
        </h4>
      </div>
    ))
  );
};

export default SingleFixtureLineups;

// {lineup.formation
//   .split('-')
//   .concat(['1'])
//   .map((formationRow) => {
//     console.log(formationRow);
//     if (formationRow === '1')
//       return <div className={classes.lineupPlayer}></div>;

//     return <div className={classes.lineupPlayer}>s</div>;
//   })}
