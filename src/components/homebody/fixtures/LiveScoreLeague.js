import { useSelector } from 'react-redux';

import classes from './LiveScoreLeague.module.css';

import LiveScoreFixture from './LiveScoreFixture';
import LeagueHeader from '../../reusable/LeagueHeader';

const LiveScoreLeague = () => {
  const fixtures = useSelector((state) => state.fixtures.fixtures);
  const filteredFixtures = useSelector(
    (state) => state.fixtures.filteredFixtures
  );

  const selectedFixtures =
    filteredFixtures.length > 0 ? filteredFixtures : fixtures;

  return selectedFixtures.map((league) => (
    <div key={league.leagueId} className={classes.LiveScoreFixtures}>
      <LeagueHeader leagueInfo={league.leagueFixtures[0].league} />
      <div>
        {league.leagueFixtures.map((fixture) => (
          <LiveScoreFixture
            key={fixture.fixture.id}
            id={fixture.fixture.id}
            fixture={fixture}
          ></LiveScoreFixture>
        ))}
      </div>
    </div>
  ));
};

export default LiveScoreLeague;
