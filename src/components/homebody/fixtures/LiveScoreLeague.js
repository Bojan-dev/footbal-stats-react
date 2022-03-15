import classes from './LiveScoreLeague.module.css';
import LiveScoreFixture from './LiveScoreFixture';
import LeagueHeader from '../../reusable/LeagueHeader';

const LiveScoreLeague = (props) => {
  const { league, id } = props;

  return (
    <div className={classes.LiveScoreFixtures}>
      <LeagueHeader leagueInfo={league[0].league} />
      <div>
        {league.map((fixture) => (
          <LiveScoreFixture
            key={fixture.fixture.id}
            id={fixture.fixture.id}
            fixture={fixture}
          ></LiveScoreFixture>
        ))}
      </div>
    </div>
  );
};

export default LiveScoreLeague;
