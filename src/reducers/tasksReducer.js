import { GET_ALL, LOADING, ERROR } from '../types/tasksTypes';

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: '',
  userId: '',
  title: '',
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL:
      return { ...state, tasks: action.payload, loading: false, error: '' };
    case LOADING:
      return { ...state, loading: true };
    case ERROR:
      return { ...state, error: action.payload, loading: false };
    case 'CHANGE_USER_ID':
      return { ...state, userId: action.payload };
    case 'CHANGE_TITLE':
      return { ...state, title: action.payload };
    default:
      return state;
  }
};

export default tasksReducer;
