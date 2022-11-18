import { Link } from 'react-router-dom';
import getFormattedDate from '../../../functions/getFormattedDate';
import classes from '../SingleFixtureClasses.module.css';
import hthClasses from './SingleFixtureHeadToHead.module.css';
import LiveScoreTeam from '../../homebody/fixtures/LiveScoreTeam';
import SingleFixtureHeadToHeadLeague from './SingleFixtureHTHLeagueName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SingleFixtureHeadToHeadFixture = ({
  fixtures,
  team = null,
  teamId = null,
}) => {
  return (
    <div>
      <div
        className={`${classes.halfTime} ${hthClasses.separateMargin} flexRowSpace ${classes.paddingEl} statsMargin`}
      >
        <p>{team ? `${team} - Last Fixtures` : 'Head to Head Fixtures'}</p>
      </div>
      <div className="flexColumn">
        {fixtures.map((fixture) => {
          let winnerCtx;

          const foundTeam =
            fixture.teams.home.id === teamId
              ? fixture.teams.home
              : fixture.teams.away;

          const isHomeTeam = fixture.teams.home.id === teamId;

          if (teamId) {
            winnerCtx = foundTeam.winner ? (
              <div className={`greenBkg flexRow ${hthClasses.winnerD}`}>W</div>
            ) : (
              <div className={`redBkg flexRow ${hthClasses.winnerD}`}>L</div>
            );
            if (foundTeam.winner === null)
              winnerCtx = (
                <div className={`drawBkg flexRow ${hthClasses.winnerD}`}>D</div>
              );
          }

          return (
            <Link
              to={`/fixtures/${fixture.fixture.id}`}
              className="statsMargin width--max"
              key={fixture.fixture.id}
            >
              <div
                key={fixture.fixture.id}
                className={`${classes.fixtureEventWrapper} ${classes.paddingEl} ${hthClasses.gap}  flexRowCenter`}
              >
                <div>
                  <p>{getFormattedDate(fixture.fixture.date)}</p>
                </div>
                <div>
                  <div className={`${hthClasses.separationLine} boxBkg`}></div>
                </div>

                <SingleFixtureHeadToHeadLeague
                  leagueName={fixture.league.name}
                  leagueFlag={fixture.league.flag}
                />

                <div className={`flexColumn ${hthClasses.team}`}>
                  {teamId ? (
                    <>
                      <LiveScoreTeam
                        logo={fixture.teams.home.logo}
                        name={fixture.teams.home.name}
                        halfTimeGoals={fixture.score.halftime?.home}
                        goals={fixture.goals.home}
                        winner={fixture.teams.home.winner}
                        selectedTeam={isHomeTeam}
                        isFinished={true}
                      />
                      <LiveScoreTeam
                        logo={fixture.teams.away.logo}
                        name={fixture.teams.away.name}
                        halfTimeGoals={fixture.score.halftime?.away}
                        goals={fixture.goals.away}
                        winner={fixture.teams.away.winner}
                        selectedTeam={!isHomeTeam}
                        isFinished={true}
                      />
                    </>
                  ) : (
                    <>
                      <LiveScoreTeam
                        logo={fixture.teams.home.logo}
                        name={fixture.teams.home.name}
                        halfTimeGoals={fixture.score.halftime?.home}
                        goals={fixture.goals.home}
                        winner={fixture.teams.home.winner}
                        isFinished={true}
                      />
                      <LiveScoreTeam
                        logo={fixture.teams.away.logo}
                        name={fixture.teams.away.name}
                        halfTimeGoals={fixture.score.halftime?.away}
                        goals={fixture.goals.away}
                        winner={fixture.teams.away.winner}
                        isFinished={true}
                      />
                    </>
                  )}
                </div>
                {teamId && (
                  <div>
                    <div
                      className={`${hthClasses.separationLine} boxBkg`}
                    ></div>
                  </div>
                )}
                {teamId && winnerCtx}
              </div>
            </Link>
          );
        })}
      </div>
      <button className={hthClasses.loadMoreBtn}>
        Load More <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
};

export default SingleFixtureHeadToHeadFixture;
