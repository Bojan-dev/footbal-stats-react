import { createSlice } from '@reduxjs/toolkit';

const singleFixtureSlice = createSlice({
  name: 'singlefixture',
  initialState: {
    selectedFixture: {},
    goalEvents: [],
    homeTeam: null,
    awayTeam: null,
    homeTeamId: null,
    awayTeamId: null,
    leagueInfo: null,
    leagueTabInfo: [],
  },
  reducers: {
    updateSelectedFixture(state, action) {
      state.selectedFixture = { ...action.payload.fixture };
    },
    updateEvent(state, action) {
      const goalEvent = action.payload;

      let homeGoals = 0;
      let awayGoals = 0;

      if (state.goalEvents.length === 0) {
        goalEvent.team.id === state.selectedFixture.teams.home.id
          ? (homeGoals = 1)
          : (awayGoals = 1);
      } else {
        const previousResult = state.goalEvents[state.goalEvents.length - 1];
        homeGoals = previousResult.homeGoals;
        awayGoals = previousResult.awayGoals;
        goalEvent.team.id === state.selectedFixture.teams.home.id
          ? (homeGoals = previousResult.homeGoals + 1)
          : (awayGoals = previousResult.awayGoals + 1);
      }

      state.goalEvents = [
        ...state.goalEvents,
        { goalEvent, homeGoals, awayGoals },
      ];
    },
    initializeGoalEvents(state) {
      state.goalEvents = [];
    },
    updateTeamsInfo(state, action) {
      state.homeTeam = action.payload.homeTeam;
      state.awayTeam = action.payload.awayTeam;
      state.homeTeamId = action.payload.homeId;
      state.awayTeamId = action.payload.awayId;
      state.leagueInfo = action.payload.leagueInfo;
    },
    updateLeagueTable(state, action) {
      state.leagueTable = action.payload.table;
    },
    reverseLeagueTable(state) {
      state.leagueTable.standings[0].reverse();
    },
    sortLeagueTable(state, action) {
      state.leagueTable.standings[0].sort();
    },
  },
});

export const singleFixtureActions = singleFixtureSlice.actions;

export default singleFixtureSlice;
