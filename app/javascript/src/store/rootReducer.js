import { combineReducers }          from 'redux';

import { playlists } from '../modules/playlists'

let rootReducer = combineReducers({
  playlists
});

export default rootReducer;
