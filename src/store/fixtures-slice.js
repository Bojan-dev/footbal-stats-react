import { createSlice } from '@reduxjs/toolkit';

import { isMatchLive, isMatchFinished } from '../functions/getFixtureStatus';

const fixturesSlice = createSlice({
  name: 'fixtures',
  initialState: {
    fixtures: [],
    filteredFixtures: [],
    liveScores: [],
  },
  reducers: {
    updateFixtures(state, actions) {
      state.fixtures = [];

      actions.payload.fixtures.forEach((fixture) => {
        if (state.fixtures[fixture.league.id]) {
          state.fixtures[fixture.league.id] = [
            ...state.fixtures[fixture.league.id],
            fixture,
          ];

          return;
        }
        state.fixtures[fixture.league.id] = [fixture];
      });

      const filterFixturesByLeague = state.fixtures.filter(
        (fixture) => fixture
      );

      state.filteredFixtures = [];
      state.fixtures = filterFixturesByLeague;
    },

    filterLiveFixtures(state) {
      state.filteredFixtures = [];

      const liveFixtures = state.fixtures.map((leagues) => {
        return leagues.filter((fixture) =>
          isMatchLive(fixture.fixture.status.short)
        );
      });

      state.filteredFixtures = liveFixtures.filter(
        (league) => league.length > 0
      );
    },

    filterFinishedFixtures(state) {
      state.filteredFixtures = [];

      const liveFixtures = state.fixtures.map((leagues) => {
        return leagues.filter((fixture) =>
          isMatchFinished(fixture.fixture.status.short)
        );
      });

      state.filteredFixtures = liveFixtures.filter(
        (league) => league.length > 0
      );
    },

    clearFilteredFixtures(state) {
      state.filteredFixtures = [];
    },
  },
});

export const fixturesActions = fixturesSlice.actions;

export default fixturesSlice;

export const fetchFixturesData = (date, dataStatus) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dataStatus({
        status: 'loading',
      });
      const response = await fetch(
        `https://v3.football.api-sports.io/fixtures?date=${date}`,
        {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': 'a0360f7a4d6543698d5650ab158449d7',
          },
        }
      );

      if (!response.ok) throw new Error('Request failed!');

      const data = await response.json();

      dispatch(fixturesActions.updateFixtures({ fixtures: data.response }));
    };

    try {
      await sendRequest();

      dataStatus({
        status: 'success',
      });
    } catch (error) {
      dataStatus({
        status: 'error',
        message: error.message,
      });
    }
  };
};
