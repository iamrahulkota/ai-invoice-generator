import { configureStore } from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk'; 
import rootReducer from "./Reducer/root-reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});

export default store;