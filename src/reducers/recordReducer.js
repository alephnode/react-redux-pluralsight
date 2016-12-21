import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function recordReducer(state = initialState.records, action) {
  switch (action.type) {
    case types.LOAD_RECORDS_SUCCESS:
      return action.records;

    case types.CREATE_RECORD_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.record)
      ];

    case types.UPDATE_RECORD_SUCCESS:
      return [
        ...state.filter(record => record.id !== action.record.id),
        Object.assign({}, action.record)
      ];

    default:
      return state;
  }
}
