import { SET_LISTA, ADD } from './types';

export const setLista = lista => ({
  type: SET_LISTA,
  payload: lista
});
export const add = dados => ({
  type: ADD,
  payload: dados
});
