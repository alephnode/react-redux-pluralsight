import {combineReducers} from 'redux';
import records from './recordReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  records,
  authors,
  ajaxCallsInProgress
});

export default rootReducer;
