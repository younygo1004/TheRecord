import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

import navigation from './navigation';

const persistConfig = {
  key: 'nowPage',
  storage,
  whitelist: ['navigation'],
};

const rootReducer = combineReducers({
  navigation,
});

export default persistReducer(persistConfig, rootReducer);
