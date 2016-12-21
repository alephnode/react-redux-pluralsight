import * as types from './actionTypes';
import RecordApi from '../api/mockRecordApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadRecordsSuccess(records) {
  return { type: types.LOAD_RECORDS_SUCCESS, records};
}

export function createCourseSuccess(record) {
  return {type: types.CREATE_RECORD_SUCCESS, record};
}

export function updateCourseSuccess(record) {
  return {type: types.UPDATE_RECORD_SUCCESS, record};
}

export function loadCourses() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return RecordApi.getAllRecords().then(records => {
      dispatch(loadRecordsSuccess(records));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveCourse(record) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return RecordApi.saveCourse(record).then(record => {
      record.id ? dispatch(updateCourseSuccess(record)) :
        dispatch(createCourseSuccess(record));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
