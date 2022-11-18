import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singleFixtureActions } from '../../../store/singlefixture-slice';
import { useEffect, useCallback } from 'react';
import table from '../../../json/table.json';
import Loading from '../../UI/Loading';
import Error from '../../UI/Error';
import useApiCalls from '../../../hooks/useApiCalls';
import btnClasses from '../../homebody/LiveScoreFilters.module.css';

const TABLE_BTNS = [
  { value: 'table', text: 'Table' },
  { value: 'form', text: 'Form' },
  { value: 'scorers', text: 'Top Scorers' },
];

const SingleFixtureLeagueTable = () => {
  const leagueInfo = useSelector((state) => state.fixture.leagueInfo);
  const leagueTable = useSelector((state) => state.fixture.leagueTable);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const updateData = useCallback(
    (data) => {
      dispatch(
        singleFixtureActions.updateLeagueTable({
          table: data?.response[0].league,
        })
      );
    },
    [dispatch]
  );

  const { sendRequest, isLoading, error } = useApiCalls(updateData);

  // useEffect(() => {
  //   sendRequest(
  //     'https://v3.football.api-sports.io/standings/',
  //     `league=${leagueInfo.id}&season=${leagueInfo.season}`
  //   );
  // }, [sendRequest, leagueInfo]);

  useEffect(() => {
    dispatch(
      singleFixtureActions.updateLeagueTable({
        table: table?.response[0].league,
      })
    );
    if (location.pathname.match(/leaguetable$/)) {
      navigate(`${location.pathname}/table`);
      return;
    }
    if (location.pathname.match(/(leaguetable\/?)$/)) {
      navigate(`${location.pathname}table`);
    }
  }, []);

  return (
    <>
      {error && <Error message={error} />}
      {isLoading && <Loading />}
      {leagueTable?.standings && !error ? (
        <div className="fixturePadding">
          <div
            className={`flexRowCenter ${btnClasses.filterCards} ${btnClasses.marginB}`}
          >
            {TABLE_BTNS.map((btn) => (
              <NavLink
                key={btn.value}
                value={btn.value}
                to={btn.value}
                className={({ isActive }) =>
                  isActive ? btnClasses.active : ''
                }
              >
                {btn.text}
              </NavLink>
            ))}
          </div>
          <Outlet />
        </div>
      ) : (
        <div className="fixturePadding">
          <h4 className="textColorMode">
            No League Table info for the selected fixture!
          </h4>
        </div>
      )}
    </>
  );
};

export default SingleFixtureLeagueTable;
