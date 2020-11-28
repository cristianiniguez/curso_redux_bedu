import axios from 'axios';
import { GET_ALL } from '../types/usersTypes';

export const getAll = () => async (dispatch) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
  dispatch({
    type: GET_ALL,
    payload: data,
  });
};
