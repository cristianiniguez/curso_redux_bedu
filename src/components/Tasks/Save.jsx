import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../general/Spinner';
import Fatal from '../general/Fatal';

import * as tasksActions from '../../actions/tasksActions';

class Save extends Component {
  changeUserId = (event) => {
    this.props.changeUserId(event.target.value);
  };

  changeTitle = (event) => {
    this.props.changeTitle(event.target.value);
  };

  save = () => {
    const { userId, title, add } = this.props;
    const newTask = { userId, title, completed: false };
    add(newTask);
  };

  disable = () => {
    const { userId, title, loading } = this.props;

    if (loading) {
      return true;
    }

    if (!userId || !title) {
      return true;
    }

    return false;
  };

  showAction = () => {
    const { error, loading } = this.props;
    if (loading) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }
  };

  render() {
    return (
      <div>
        <h1>Guardar tarea</h1>
        Usuario id: <input type='number' value={this.props.userId} onChange={this.changeUserId} />
        <br />
        <br />
        Título: <input type='text' value={this.props.title} onChange={this.changeTitle} />
        <br />
        <br />
        <button onClick={this.save} disabled={this.disable()}>
          Guardar
        </button>
        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Save);
