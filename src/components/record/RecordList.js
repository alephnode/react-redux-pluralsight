import React, {PropTypes} from 'react';
import RecordListRow from './RecordListRow';

const RecordList = ({records}) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {records.map(record =>
        <RecordListRow key={record.id} record={record}/>
      )}
      </tbody>
    </table>
  );
};

RecordList.propTypes = {
  records: PropTypes.array.isRequired
};

export default RecordList;
