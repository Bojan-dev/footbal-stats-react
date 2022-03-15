import { useState, useEffect, useCallback } from 'react';
import useApiCalls from '../../hooks/useApiCalls';
import { useSearchParams } from 'react-router-dom';

import Loading from '../UI/Loading';
import Error from '../UI/Error';

import getCurrentDate from '../../functions/getCurrentDate';

import LiveScoreCardHeader from './LiveScoreCardHeader';
import LiveScoreFilters from './LiveScoreFilters';
import LiveScoreLeague from './fixtures/LiveScoreLeague';

const StatsCard = () => {
  const [selectedFixtures, setSelectedFixtures] = useState([]);
  const [filteredFixtures, setFilteredFixtures] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  const [searchParams, setSearchParams] = useSearchParams();

  const filterBtnsHandler = (filterFun, navigatePath, initial = false) => {
    if (initial) {
      setSearchParams({});
      setFilteredFixtures([]);
      return;
    }

    const filteredFixtures = selectedFixtures.map((leagueArr) => {
      return leagueArr.filter((fixture) =>
        filterFun(fixture.fixture.status.short)
      );
    });

    const filterEmptyLeagues = filteredFixtures.filter(
      (league) => league.length > 0
    );

    setFilteredFixtures(filterEmptyLeagues);

    setSearchParams({ filter: navigatePath });
  };

  const handleAllTodaysFixtures = useCallback((data) => {
    let selectedFixturesByLeagues = [];

    data.response.forEach((fixture) => {
      if (selectedFixturesByLeagues[fixture.league.id]) {
        selectedFixturesByLeagues[fixture.league.id] = [
          ...selectedFixturesByLeagues[fixture.league.id],
          fixture,
        ];

        return;
      }
      selectedFixturesByLeagues[fixture.league.id] = [fixture];
    });

    const filterFixturesByLeague = selectedFixturesByLeagues.filter(
      (fixture) => fixture
    );

    setSelectedFixtures(filterFixturesByLeague);
  }, []);

  //prettier-ignore
  const {sendRequest: fetchTodayFixtures, isLoading: isLoadingTodayFixtures, error: errorTodayFixtures} = useApiCalls(handleAllTodaysFixtures);

  useEffect(() => {
    fetchTodayFixtures(
      `https://v3.football.api-sports.io/fixtures`,
      `date=${selectedDate}`
    );

    setSearchParams({});
  }, [fetchTodayFixtures, selectedDate, setSearchParams]);

  const currentFixtures =
    filteredFixtures.length > 0 ? filteredFixtures : selectedFixtures;

  return (
    <>
      <LiveScoreCardHeader
        date={selectedDate}
        setDate={setSelectedDate}
      ></LiveScoreCardHeader>
      <LiveScoreFilters
        filterBtnsHandler={filterBtnsHandler}
        urlParam={searchParams}
      ></LiveScoreFilters>
      {isLoadingTodayFixtures ? (
        <Loading />
      ) : (
        currentFixtures.map((league) => (
          <LiveScoreLeague
            league={league}
            key={league[0].league.id}
            id={league[0].league.id}
          ></LiveScoreLeague>
        ))
      )}
      {!isLoadingTodayFixtures && errorTodayFixtures && (
        <Error message={errorTodayFixtures} />
      )}
    </>
  );
};

export default StatsCard;
