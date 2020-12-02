import axios from 'axios';
import { ERROR, UPDATE, LOADING } from '../types/postsTypes';
import * as usersTypes from '../types/usersTypes';

const { GET_ALL: USERS_GET_ALL } = usersTypes;

export const getByUser = (key) => async (dispatch, getState) => {
  dispatch({ type: LOADING });

  const { users } = getState().usersReducer;
  const { posts } = getState().postsReducer;
  const userId = users[key].id;

  try {
    const { data } = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const news = data.map((post) => ({ ...post, comments: [], open: false }));
    const updatedPosts = [...posts, news];

    dispatch({
      type: UPDATE,
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

export const openClose = (postsKey, postSubkey) => (dispatch, getState) => {
  const { posts } = getState().postsReducer;
  const selectedPost = posts[postsKey][postSubkey];

  const updatedPost = {
    ...selectedPost,
    open: !selectedPost.open,
  };

  const updatedPosts = [...posts];
  updatedPosts[postsKey] = [...posts[postsKey]];
  updatedPosts[postsKey][postSubkey] = updatedPost;

  dispatch({
    type: UPDATE,
    payload: updatedPosts,
  });
};

export const getComments = (postsKey, postSubkey) => (dispatch, getState) => {
  // ...
}
