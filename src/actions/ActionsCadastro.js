import { MaskService } from 'react-native-masked-text';
import { Alert } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
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
} from './types';

export const setNome = text => ({
  type: SET_NOME,
  payload: text
});
export const setEmail = email => ({
  type: SET_EMAIL,
  payload: email
});
export const setNascimento = data => ({
  type: SET_NASCIMENTO,
  payload: data
});
export const setCelular = celular => ({
  type: SET_CELULAR,
  payload: celular
});
export const setId = id => ({
  type: SET_ID,
  payload: id
});
export const reset = () => ({
  type: RESET,
});
export const cadastrar = ({ nome, email, nascimento, celular }) => (
  dispatch => {
    dispatch({
      type: CADASTRO_EM_ANDAMENTO
    });
    const error = validar({ nome, email, nascimento, celular });
    if (error) {
      dispatch({
        type: ERRO_CADASTRO,
        payload: error
      });
    } else {
      firebase.database().ref('cadastros')
        .push({ nome, nascimento, celular, email })
        .then(() => {
          Alert.alert('Cadastro realizado com sucesso !');
          Actions.pop();
          dispatch({
            type: SUCESSO_CADASTRO
          });
        })
        .catch(() => dispatch({
          type: ERRO_CADASTRO,
          payload: 'Não foi possivel realizar o cadastro'
        }));
    }
  }
);
const validar = ({ nome, email, nascimento, celular }) => {
  const dados = [nome, email, nascimento, celular];
  let message = '';
  if (dados.some(s => s.trim().length === 0)) {
    message += '- Todos os campos devem ser preenchidos\n';
  } else {
    const emailRegex = /^[\w.]+@\w+(\.\w{2,})+$/;
    const nomeRegex = /^([a-zA-Z\u00C0-\u00FF]+ ?)+$/;
    
    if (!nomeRegex.test(nome)) {
      message += '- Nome inválido\n';
    }
    if (!MaskService.isValid('cel-phone', celular, { format: '(99)9999-9999' })) {
      message += '- Telefone inválido\n';
    }
    if (!MaskService.isValid('datetime', nascimento, { format: 'DD/MM/YYYY' })) {
      message += '- Data de nascimento inválida\n';
    }
    if (!emailRegex.test(email)) {
      message += '- E-mail inválido\n';
    }
  }
  return message;
};

export const atualizarCadastro = ({ nome, email, nascimento, celular, id }) => (
  dispatch => {
    const error = validar({ nome, email, nascimento, celular });
    if (error) {
      dispatch({
        type: ERRO_CADASTRO,
        payload: error
      });
    } else {
      firebase.database().ref(`cadastros/${id}`)
        .set({ nome, email, nascimento, celular })
        .then(() => {
          Alert.alert('Cadastro atualizado com sucesso !');
          Actions.pop();
          dispatch({
            type: SUCESSO_CADASTRO
          });
        })
        .catch(() => dispatch({
          type: ERRO_CADASTRO,
          payload: 'Não foi possivel atualizar o cadastro'
        }));
    }
  }
);
