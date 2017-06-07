import { 
  SET_LISTA, 
  ADD,
 } from '../actions/types';

const INITIAL_STATE = {
  lista: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LISTA:
      return { ...state, lista: action.payload };
    case ADD:
      return { ...state, lista: state.lista.concat(action.payload) };
    default:
      return state;
  }
};
