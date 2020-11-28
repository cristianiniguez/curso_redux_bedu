import axios from 'axios';
import { GET_ALL } from '../types/usersTypes';

export const getAll = () => async (dispatch) => {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch({
      type: GET_ALL,
      payload: data,
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
};
