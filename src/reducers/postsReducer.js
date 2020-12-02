import { UPDATE, LOADING, ERROR, COM_LOADING, COM_ERROR } from '../types/postsTypes';

const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: '',
  com_loading: false,
  com_error: '',
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE:
      return { ...state, posts: action.payload, loading: false, error: '' };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case COM_LOADING:
      return { ...state, com_loading: true };
    case COM_ERROR:
      return { ...state, com_error: action.payload, com_loading: false };
    default:
      return state;
  }
};

export default postsReducer;
