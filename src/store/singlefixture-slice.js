import { createSlice } from '@reduxjs/toolkit';

const singleFixtureSlice = createSlice({
  name: 'singlefixture',
  initialState: {
    selectedFixture: {},
    goalEvents: [],
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
  },
});

export const singleFixtureActions = singleFixtureSlice.actions;

export default singleFixtureSlice;
