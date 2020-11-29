// import { GET_ALL, LOADING, ERROR } from '../types/usersTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default postsReducer;
