import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as tasksActions from '../../actions/tasksActions';

class Tasks extends Component {
  componentDidMount() {
    this.props.getAll();
  }

  showContent = () => {
    const { tasks, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <Fatal mensaje={error} />;
    }

    return Object.keys(tasks).map((userId) => (
      <div key={userId}>
        <h2>Usuario {userId}</h2>
        <div className='container__tasks'>{this.putTasks(userId)}</div>
      </div>
    ));
  };

  putTasks = (userId) => {
    const { tasks } = this.props;
    const tasksByUser = { ...tasks[userId] };
    return Object.keys(tasksByUser).map((taskId) => (
      <div key={taskId}>
        <input type='checkbox' defaultChecked={tasksByUser[taskId].completed} />
        {tasksByUser[taskId].title}
      </div>
    ));
  };

  render() {
    console.log(this.props);
    return <div>{this.showContent()}</div>;
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tasks);
