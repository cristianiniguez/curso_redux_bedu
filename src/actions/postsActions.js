import axios from 'axios';
import { ERROR, GET_BY_USER, LOADING } from '../types/postsTypes';
import * as usersTypes from '../types/usersTypes';

const { GET_ALL: USERS_GET_ALL } = usersTypes;

export const getByUser = (key) => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const { users } = getState().usersReducer;
  const { posts } = getState().postsReducer;
  const userId = users[key].id;

  try {
    const { data } = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const updatedPosts = [...posts, data];

    dispatch({
      type: GET_BY_USER,
      payload: updatedPosts,
    });

    const postsKey = updatedPosts.length - 1;
    const updatedUsers = [...users];
    updatedUsers[key] = {
      ...users[key],
      postsKey,
    };

    dispatch({
      type: USERS_GET_ALL,
      payload: updatedUsers,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: 'Publicaciones no disponibles',
    });
  }
};
