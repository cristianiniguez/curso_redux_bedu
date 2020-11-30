import axios from 'axios';
import { GET_BY_USER } from '../types/postsTypes';

export const getByUser = (key) => async (dispatch, getState) => {
  const { users } = getState().usersReducer;
  const { posts } = getState().postsReducer;
  const userId = users[key].id;
  const { data } = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const updatedPosts = [...posts, ...data];
  dispatch({
    type: GET_BY_USER,
    payload: updatedPosts,
  });
};
