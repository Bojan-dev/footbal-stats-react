import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import LiveScoreCardHeader from './LiveScoreCardHeader';
import LiveScoreFilters from './LiveScoreFilters';
import LiveScoreLeague from './fixtures/LiveScoreLeague';

import Loading from '../UI/Loading';
import Error from '../UI/Error';

import { fetchFixturesData } from '../../store/fixtures-slice';
import { fixturesActions } from '../../store/fixtures-slice';
import { useDispatch, useSelector } from 'react-redux';

const StatsCard = () => {
  const dispatch = useDispatch();

  const fixturesSelectedDate = useSelector(
    (state) => state.fixtures.fixturesDate
  );

  const [searchParam, setSearchParam] = useSearchParams();

  const [dataStatus, setDataStatus] = useState({});

  useEffect(() => {
    setSearchParam({});
    dispatch(
      fetchFixturesData(
        fixturesActions.updateFixturesInitially,
        fixturesSelectedDate,
        false,
        setDataStatus
      )
    );
  }, [dispatch, fixturesSelectedDate, setSearchParam]);

  let output;

  switch (dataStatus.status) {
    case 'loading':
      output = <Loading />;
      break;

    case 'success':
      output = <LiveScoreLeague />;
      break;

    default:
      output = <Error message={dataStatus.message} />;
      break;
  }

  return (
    <>
      <LiveScoreCardHeader></LiveScoreCardHeader>
      <LiveScoreFilters
        urlParam={searchParam}
        setSearchParam={setSearchParam}
      ></LiveScoreFilters>
      {output}
    </>
  );
};

export default StatsCard;
