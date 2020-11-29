import axios from 'axios';
import { ERROR, GET_ALL, LOADING } from '../types/postsTypes';

export const getAll = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const { data } = await axios.get('http://jsonplaceholder.typicode.com/posts');
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    console.error('Error:', error.message);
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal. Intente más tarde.',
    });
  }
};
