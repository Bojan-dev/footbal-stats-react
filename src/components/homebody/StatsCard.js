import { useState, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import getCurrentDate from '../../functions/getCurrentDate';

import LiveScoreCardHeader from './LiveScoreCardHeader';
import LiveScoreFilters from './LiveScoreFilters';
import LiveScoreLeague from './fixtures/LiveScoreLeague';

import Loading from '../UI/Loading';
import Error from '../UI/Error';

import { fetchFixturesData } from '../../store/fixtures-slice';
import { useDispatch, useSelector } from 'react-redux';

const StatsCard = () => {
  const dispatch = useDispatch();
  const fixtures = useSelector((state) => state.fixtures.fixtures);
  const filteredFixtures = useSelector(
    (state) => state.fixtures.filteredFixtures
  );

  const [searchParam, setSearchParam] = useSearchParams();

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [dataStatus, setDataStatus] = useState({});

  useEffect(() => {
    dispatch(fetchFixturesData(selectedDate, setDataStatus));
  }, [dispatch, selectedDate]);

  const currentFixtures =
    filteredFixtures.length > 0 ? filteredFixtures : fixtures;

  return (
    <>
      <LiveScoreCardHeader
        date={selectedDate}
        setDate={setSelectedDate}
      ></LiveScoreCardHeader>
      <LiveScoreFilters
        urlParam={searchParam}
        setSearchParam={setSearchParam}
      ></LiveScoreFilters>
      {dataStatus.status === 'loading' && <Loading />}
      {dataStatus.status === 'success' &&
        currentFixtures.map((league) => (
          <LiveScoreLeague
            league={league}
            key={league[0].league.id}
            id={league[0].league.id}
          ></LiveScoreLeague>
        ))}
      {dataStatus.status === 'error' && <Error message={dataStatus.message} />}
    </>
  );
};

export default StatsCard;
