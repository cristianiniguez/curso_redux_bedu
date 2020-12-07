import axios from 'axios';
import { GET_ALL, LOADING, ERROR } from '../types/tasksTypes';

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
    type: 'CHANGE_USER_ID',
    payload: userId,
  });
};

export const changeTitle = (title) => (dispatch) => {
  dispatch({
    type: 'CHANGE_TITLE',
    payload: title,
  });
};

export const add = (newTask) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', newTask);
    console.log(data);
    dispatch({
      type: 'ADDED',
    });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: ERROR, payload: 'Intente más tarde' });
  }
};
