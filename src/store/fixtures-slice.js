import { createSlice } from '@reduxjs/toolkit';

import { isMatchFinished } from '../functions/getFixtureStatus';
import getCurrentDate from '../functions/getCurrentDate';

const initialState = {
  fixtures: [],
  filteredFixtures: [],
  todayFixtures: [],
  liveScores: [],
  fixturesDate: getCurrentDate(),
};

const fixturesSlice = createSlice({
  name: 'fixtures',
  initialState,
  reducers: {
    updateFixturesInitially(state, actions) {
      state.fixturesDate = actions.payload.date;

      if (state.fixturesDate !== getCurrentDate()) {
        state.todayFixtures = state.fixtures;
      }

      state.fixtures = [];

      actions.payload.fixtures.forEach((fixture) => {
        if (state.fixtures[fixture.league.id]) {
          state.fixtures[fixture.league.id].leagueFixtures = [
            ...state.fixtures[fixture.league.id].leagueFixtures,
            fixture,
          ];

          return;
        }
        state.fixtures[fixture.league.id] = {
          leagueId: fixture.league.id,
          leagueFixtures: [fixture],
        };
      });

      const filterFixturesByLeague = state.fixtures.filter(
        (fixture) => fixture.leagueFixtures.length > 0
      );

      state.filteredFixtures = [];
      state.fixtures = filterFixturesByLeague;
    },

    updateLiveFixturesInitially(state, action) {
      const liveFixtures = action.payload.fixtures;

      state.liveScores = liveFixtures;
    },

    updateLiveFixtures(state, actions) {
      const liveFixtures = actions.payload.fixtures;

      //Remove finished fixtures:
      //prettier-ignore
      const filterFinishedFixtures = state.liveScores.filter((fixture) => !fixture.matchIsFinished);

      state.liveScores = filterFinishedFixtures;

      const isSelectedDateToday = state.fixturesDate === getCurrentDate();

      for (let index = 0; index < state.liveScores.length; index++) {
        //Finding fixtureIndex and leagueIndex based on the selected date:
        //prettier-ignore
        const allFixturesLeagueIndex = isSelectedDateToday ? state.fixtures.findIndex((league) => league.leagueId === state.liveScores[index].league.id) : state.todayFixtures.findIndex((league) => league.leagueId === state.liveScores[index].league.id);

        //prettier-ignore
        const allFixturesFixtureIndex = isSelectedDateToday ? state.fixtures[allFixturesLeagueIndex].leagueFixtures.findIndex((fixture) => fixture.fixture.id === state.liveScores[index].fixture.id) : state.todayFixtures[allFixturesLeagueIndex].leagueFixtures.findIndex((fixture) => fixture.fixture.id === state.liveScores[index].fixture.id);

        //Returning liveChange property back to false if it exist:
        if (state.liveScores[index].liveChange) {
          state.liveScores[index.liveChange] = false;

          //Setting match status based on the selected date:
          //prettier-ignore
          isSelectedDateToday ? (state.fixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = false) : (state.todayFixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = false);
        }

        const liveFixtureIndex = liveFixtures.findIndex(
          (fixture) => fixture.fixture.id === state.liveScores[index].fixture.id
        );

        if (liveFixtureIndex === -1) {
          state.liveScores[index].matchIsFinished = true;

          //Setting match status based on the selected date:
          //prettier-ignore
          isSelectedDateToday ? (state.fixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].fixture.status.short = 'FT') : (state.todayFixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].fixture.status.short = 'FT');

          continue;
        }

        //If not:
        const homeGoals = state.liveScores[index].goals.home;
        const awayGoals = state.liveScores[index].goals.away;

        state.liveScores[index] = liveFixtures[liveFixtureIndex];

        //prettier-ignore
        if(isSelectedDateToday){ 
          state.fixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex] = liveFixtures[liveFixtureIndex] 
        }else{
          state.todayFixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex] = liveFixtures[liveFixtureIndex];
        }

        //prettier-ignore

        //If nothing's changed just continue to the next iteration:
        //prettier-ignore
        if (homeGoals === liveFixtures[liveFixtureIndex].goals.home && awayGoals === liveFixtures[liveFixtureIndex].goals.away) continue;

        //prettier-ignore
        if (homeGoals !== liveFixtures[liveFixtureIndex].goals.home && awayGoals !== liveFixtures[liveFixtureIndex].goals.away) {
          state.liveScores[index].liveChange = 3;
          //prettier-ignore
          isSelectedDateToday ? (state.fixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = 3) : (state.todayFixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = 3);
          continue;
        }

        if (homeGoals !== liveFixtures[liveFixtureIndex].goals.home) {
          state.liveScores[index].liveChange = 1;

          //prettier-ignore
          isSelectedDateToday ? (state.fixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = 1) : (state.todayFixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = 1);
          continue;
        }

        state.liveScores[index].liveChange = 2;
        //prettier-ignore
        isSelectedDateToday ? (state.fixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = 2) : (state.todayFixtures[allFixturesLeagueIndex].leagueFixtures[allFixturesFixtureIndex].liveChange = 2);
      }

      state.liveScores.sort((a, b) =>
        a.hasOwnProperty('liveChange') || a.hasOwnProperty('matchIsFinished')
          ? -1
          : b.hasOwnProperty('liveChange') ||
            b.hasOwnProperty('matchIsFinished')
          ? 1
          : 0
      );
    },

    filterLiveFixtures(state) {
      state.filteredFixtures = [];

      state.liveScores.forEach((fixture) => {
        if (state.filteredFixtures[fixture.league.id]) {
          state.filteredFixtures[fixture.league.id].leagueFixtures = [
            ...state.filteredFixtures[fixture.league.id].leagueFixtures,
            fixture,
          ];

          return;
        }
        state.filteredFixtures[fixture.league.id] = {
          leagueId: fixture.league.id,
          leagueFixtures: [fixture],
        };
      });
    },

    filterFinishedFixtures(state) {
      state.filteredFixtures = [];

      state.fixtures.forEach((league) => {
        const { leagueId } = league;

        const filteredFinished = league.leagueFixtures.filter((fixture) =>
          isMatchFinished(fixture.fixture.status.short)
        );

        if (filteredFinished.length > 0)
          state.filteredFixtures.push({
            leagueId,
            leagueFixtures: filteredFinished,
          });
      });
    },

    clearFilteredFixtures(state) {
      state.filteredFixtures = [];
    },

    changeFixturesDate(state, action) {
      state.fixturesDate = action.payload.date;
    },
  },
});

export const fixturesActions = fixturesSlice.actions;

export default fixturesSlice;

export const fetchFixturesData = (fn, date, query, dataStatus = false) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      if (dataStatus)
        dataStatus({
          status: 'loading',
        });
      const response = await fetch(
        date
          ? `https://v3.football.api-sports.io/fixtures?date=${date}`
          : `https://v3.football.api-sports.io/fixtures?${query}`,
        {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': 'a0360f7a4d6543698d5650ab158449d7',
          },
        }
      );

      if (!response.ok) throw new Error('Request failed!');

      const data = await response.json();

      dispatch(fn({ fixtures: data.response, date }));
    };

    try {
      await sendRequest();

      if (dataStatus)
        dataStatus({
          status: 'success',
        });
    } catch (error) {
      if (dataStatus)
        dataStatus({
          status: 'error',
          message: error.message,
        });
    }
  };
};
