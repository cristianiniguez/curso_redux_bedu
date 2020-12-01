import axios from 'axios';
import { GET_ALL, LOADING, ERROR } from '../types/usersTypes';

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    console.error('Error:', error.message);
    dispatch({
      type: ERROR,
      payload: 'Información de usuario no disponible',
    });
  }
};
