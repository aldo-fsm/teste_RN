import { MaskService } from 'react-native-masked-text';
import { Alert } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import CryptoJs from 'crypto-js';
import {
  SET_EMAIL,
  SET_NASCIMENTO,
  SET_CELULAR,
  SET_NOME,
  SET_ID,
  SET_IMAGE,
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
export const setImage = image => ({
  type: SET_IMAGE,
  payload: image
});
export const reset = () => ({
  type: RESET,
});
export const cadastrar = ({ nome, email, nascimento, celular, image }) => (
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
          sendCloudinary(image, email); // trocar email por id
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

const sendCloudinary = (image, id) => {
  const uri = image.path;
  const publicId = `users_profiles/${id}`;
  let timestamp = (Date.now() / 1000 | 0).toString();
  let api_key = '627196582421517';
  let api_secret = '6aYJhH8DovA5c980fDUKafUIo_A';
  let cloud = 'dmdleuqma';
  let hash_string ='public_id=' + publicId + '&' + 'timestamp=' + timestamp + api_secret;
  let signature = CryptoJs.SHA1(hash_string).toString();
  let upload_url = 'https://api.cloudinary.com/v1_1/' + cloud + '/image/upload';

  let xhr = new XMLHttpRequest();
  xhr.open('POST', upload_url);
  xhr.onload = () => {
    console.log(xhr);
  };
  let formdata = new FormData();
  formdata.append('file', {uri: uri, type: 'image/jpeg', name: 'profile_picture.jpg'});
  formdata.append('timestamp', timestamp);
  formdata.append('api_key', api_key);
  formdata.append('signature', signature);
  formdata.append('public_id', publicId);
  xhr.send(formdata);
};

