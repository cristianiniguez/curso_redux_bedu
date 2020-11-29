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

export const getByUser = (key) => async (dispatch, getState) => {
  const { users } = getState().usersReducer;
  const userId = users[key].id;
  const { data } = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  dispatch({
    type: GET_ALL,
    payload: data,
  });
};
