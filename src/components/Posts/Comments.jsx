import React from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

const Comments = (props) => {
  console.log(props);
  if (props.com_error) {
    return <Fatal mensaje={props.com_error} />;
  }
  if (props.com_loading && !props.comments.length) {
    return <Spinner />;
  }
  const putComments = () =>
    props.comments.map((comment) => (
      <li key={comment.id}>
        <b>
          <u>{comment.email}</u>
        </b>
        <br />
        {comment.body}
      </li>
    ));
  return <ul>{putComments()}</ul>;
};

const mapStateToProps = ({ postsReducer }) => postsReducer;

export default connect(mapStateToProps)(Comments);
