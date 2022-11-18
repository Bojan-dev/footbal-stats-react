import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SingleFixtureHeadToHeadMain from './SingleFixtureHTHMain';
import btnClasses from '../../homebody/LiveScoreFilters.module.css';

const SingleFixtureHeadToHead = () => {
  const homeTeamId = useSelector((state) => state.fixture.homeTeamId);
  const awayTeamId = useSelector((state) => state.fixture.awayTeamId);
  const homeTeam = useSelector((state) => state.fixture.homeTeam);
  const awayTeam = useSelector((state) => state.fixture.awayTeam);
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = () => searchParams.get('h2h');

  const handleParam = (e) => {
    setSearchParams({ h2h: e.target.value });
  };

  return (
    <>
      {homeTeamId && awayTeamId ? (
        <div className={`fixturePadding`}>
          <div
            className={`flexRowCenter ${btnClasses.filterCards} ${btnClasses.marginB}`}
          >
            <button
              value="overall"
              onClick={(e) => handleParam(e)}
              className={
                getParam() !== 'home' && getParam() !== 'away'
                  ? btnClasses.active
                  : ''
              }
            >
              Head to Head
            </button>
            <button
              value="home"
              onClick={(e) => handleParam(e)}
              className={getParam() === 'home' ? btnClasses.active : ''}
            >
              {homeTeam}
            </button>
            <button
              value="away"
              onClick={(e) => handleParam(e)}
              className={getParam() === 'away' ? btnClasses.active : ''}
            >
              {awayTeam}
            </button>
          </div>
          {getParam() !== 'home' && getParam() !== 'away' && (
            <>
              <SingleFixtureHeadToHeadMain
                url={'https://v3.football.api-sports.io/fixtures/headtohead/'}
                query={`h2h=${homeTeamId}-${awayTeamId}&last=`}
                paginationVal={3}
              />
              <SingleFixtureHeadToHeadMain
                url={'https://v3.football.api-sports.io/fixtures/'}
                query={`team=${homeTeamId}&last=`}
                teamId={homeTeamId}
                team={homeTeam}
                paginationVal={3}
              />
              <SingleFixtureHeadToHeadMain
                url={'https://v3.football.api-sports.io/fixtures/'}
                query={`team=${awayTeamId}&last=`}
                teamId={awayTeamId}
                team={awayTeam}
                paginationVal={3}
              />
            </>
          )}
          {getParam() === 'home' && (
            <SingleFixtureHeadToHeadMain
              url={'https://v3.football.api-sports.io/fixtures/'}
              query={`team=${homeTeamId}&last=`}
              teamId={homeTeamId}
              team={homeTeam}
              paginationVal={5}
            />
          )}
          {getParam() === 'away' && (
            <SingleFixtureHeadToHeadMain
              url={'https://v3.football.api-sports.io/fixtures/'}
              query={`team=${awayTeamId}&last=`}
              teamId={awayTeamId}
              team={awayTeam}
              paginationVal={5}
            />
          )}
        </div>
      ) : (
        <div className="fixturePadding">
          <h4 className="textColorMode">
            No Head to Head info for the selected fixture!
          </h4>
        </div>
      )}
    </>
  );
};

export default SingleFixtureHeadToHead;
