import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as tasksActions from '../../actions/tasksActions';

class Tasks extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tasks).length) {
      this.props.getAll();
    }
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
        <Link to={`/tasks/save/${userId}/${taskId}`}>
          <button className='m-left'>Editar</button>
        </Link>
        <button className='m-left'>Eliminar</button>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <Link to='/tasks/save'>
          <button>Add</button>
        </Link>
        {this.showContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tasks);
