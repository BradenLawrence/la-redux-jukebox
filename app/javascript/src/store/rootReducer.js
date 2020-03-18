import { combineReducers } from 'redux';

import { library } from '../modules/library'
import { playlists } from '../modules/playlists'

let rootReducer = combineReducers({
  library,
  playlists
});

export default rootReducer;
