import { configureStore } from '@reduxjs/toolkit';

import colorModeSlice from './colormode-slice';

const store = configureStore({
  reducer: { colorMode: colorModeSlice.reducer },
});

export default store;
