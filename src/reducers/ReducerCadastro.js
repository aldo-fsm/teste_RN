import {
  SET_EMAIL,
  SET_NASCIMENTO,
  SET_CELULAR,
  SET_NOME,
  SET_ID,
  ERRO_CADASTRO,
  SUCESSO_CADASTRO,
  CADASTRO_EM_ANDAMENTO,
  RESET
} from '../actions/types';

const INITIAL_STATE = {
  nome: '',
  email: '',
  nascimento: '',
  celular: '',
  id: '',
  errorMessage: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOME:
      return { ...state, nome: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_NASCIMENTO:
      return { ...state, nascimento: action.payload };
    case SET_CELULAR:
      return { ...state, celular: action.payload };
    case SET_ID:
      return { ...state, id: action.payload };
    case SUCESSO_CADASTRO:
      return INITIAL_STATE;
    case ERRO_CADASTRO:
      return { ...state, errorMessage: action.payload, loading: false };
    case CADASTRO_EM_ANDAMENTO:
      return { ...state, loading: true };
    case RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
};
