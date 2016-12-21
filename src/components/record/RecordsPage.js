import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recordActions from '../../actions/recordActions';
import RecordList from './RecordList';
import {browserHistory} from 'react-router';

class RecordsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddRecordPage = this.redirectToAddRecordPage.bind(this);
  }

  recordRow(record, index) {
    return <div key={index}>{record.title}</div>;
  }

  redirectToAddRecordPage() {
    browserHistory.push('/record');
  }

  render() {
    const {records} = this.props;

    return (
      <div>
        <h1>Records</h1>
        <input type="submit"
               value="Add Record"
               className="btn btn-primary"
               onClick={this.redirectToAddRecordPage}/>
        <RecordList records={records}/>
      </div>
    );
  }
}

RecordsPage.propTypes = {
  records: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    records: state.records
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recordActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage);
