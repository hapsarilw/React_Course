import { configureStore  } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';


export const INCREMENT = 'increment';

// SHOULD HAS ONE REDUCER
const store = configureStore({
  reducer:  { counter: counterReducer, auth: authReducer },
});





export default store;