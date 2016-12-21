import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const RecordListRow = ({record}) => {
  return (
    <tr>
      <td><a href={record.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/record/' + record.id}>{record.title}</Link></td>
      <td>{record.authorId}</td>
      <td>{record.category}</td>
      <td>{record.length}</td>
    </tr>
  );
};

RecordListRow.propTypes = {
  record: PropTypes.object.isRequired
};

export default RecordListRow;
