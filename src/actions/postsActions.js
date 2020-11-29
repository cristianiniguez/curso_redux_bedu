import axios from 'axios';

export const getAll = () => async (dispatch) => {
  const { data } = await axios.get('http://jsonplaceholder.typicode.com/posts');
  dispatch({
    type: 'get_all',
    payload: data,
  });
};
