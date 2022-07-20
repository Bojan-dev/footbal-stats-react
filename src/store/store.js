import { configureStore } from '@reduxjs/toolkit';

import colorModeSlice from './colormode-slice';
import fixturesSlice from './fixtures-slice';
import singleFixtureSlice from './singlefixture-slice';

const store = configureStore({
  reducer: {
    colorMode: colorModeSlice.reducer,
    fixtures: fixturesSlice.reducer,
    fixture: singleFixtureSlice.reducer,
  },
});

export default store;
