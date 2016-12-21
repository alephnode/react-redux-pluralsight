import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import RecordsPage from './components/record/RecordsPage';
import ManageRecordPage from './components/record/ManageRecordPage'; //eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="records" component={RecordsPage} />
    <Route path="record" component={ManageRecordPage} />
    <Route path="record/:id" component={ManageRecordPage} />
    <Route path="about" component={AboutPage} />
  </Route>
);
