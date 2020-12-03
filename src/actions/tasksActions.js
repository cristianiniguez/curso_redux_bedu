import axios from 'axios';
import { GET_ALL, LOADING, ERROR } from '../types/tasksTypes';

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    console.error('Error:', error.message);
    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible',
    });
  }
};
