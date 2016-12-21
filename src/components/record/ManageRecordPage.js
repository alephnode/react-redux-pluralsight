import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as recordActions from '../../actions/recordActions';
import RecordForm from './RecordForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageRecordPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      record: Object.assign({}, props.record),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.record.id != nextProps.record.id) {
      // Necessary to populate form when existing record is loaded directly.
      this.setState({record: Object.assign({}, nextProps.record)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let record = this.state.record;
    record[field] = event.target.value;
    return this.setState({record: record});
  }

  recordFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.record.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveCourse(event) {
    event.preventDefault();

    if (!this.recordFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveCourse(this.state.record)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('records');
  }

  render() {
    return (
      <RecordForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        record={this.state.record}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageRecordPage.propTypes = {
  record: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageRecordPage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(records, id) {
  const record = records.filter(record => record.id == id);
  if (record) return record[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const recordId = ownProps.params.id; // from the path `/record/:id`

  let record = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  if (recordId && state.records.length > 0) {
    record = getCourseById(state.records, recordId);
  }

  return {
    record: record,
    authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(recordActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecordPage);
