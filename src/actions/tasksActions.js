import axios from 'axios';
import {
  GET_ALL,
  LOADING,
  ERROR,
  CHANGE_USER_ID,
  CHANGE_TITLE,
  SAVE,
  UPDATE,
  CLEAN,
} from '../types/tasksTypes';

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');

    const tasks = {};
    data.forEach((task) => {
      tasks[task.userId] = { ...tasks[task.userId], [task.id]: { ...task } };
    });

    dispatch({
      type: GET_ALL,
      payload: tasks,
    });
  } catch (error) {
    console.error('Error:', error.message);
    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible',
    });
  }
};

export const changeUserId = (userId) => (dispatch) => {
  dispatch({
    type: CHANGE_USER_ID,
    payload: userId,
  });
};

export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: CHANGE_TITLE,
    payload: title,
  });
};

export const add = (newTask) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
    dispatch({ type: SAVE });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: ERROR, payload: 'Intente más tarde' });
  }
};

export const edit = (editedTask) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${editedTask.id}`, editedTask);
    dispatch({ type: SAVE });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: ERROR, payload: 'Intente más tarde' });
  }
};

export const changeCheck = (userId, taskId) => (dispatch, getState) => {
  const { tasks } = getState().tasksReducer;
  const selected = tasks[userId][taskId];
  const updated = {
    ...tasks,
  };
  updated[userId] = {
    ...tasks[userId],
  };
  updated[userId][taskId] = {
    ...tasks[userId][taskId],
    completed: !selected.completed,
  };
  dispatch({
    type: UPDATE,
    payload: updated,
  });
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
    dispatch({ type: GET_ALL, payload: {} });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: ERROR, payload: 'Servicio no disponible' });
  }
};

export const cleanForm = () => (dispatch) => {
  dispatch({ type: CLEAN });
};
