import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import TelaCadastro from './components/TelaCadastro';
import TelaLista from './components/TelaLista';
import TelaEdicao from './components/TelaEdicao';
import Principal from './components/Principal';

export default () => (
  <Router
    navigationBarStyle={{ backgroundColor: '#1f4e9b', elevation: 7 }}
    titleStyle={{ color: '#fff' }}
  >
    <Scene
      key='principal'
      component={Principal}
      title='Principal'
      hideNavBar
      initial
    />
    <Scene
      key='telaCadastro'
      component={TelaCadastro}
      title='Cadastre-se'
      hideNavBar={false}
    />
    <Scene
      key='telaLista'
      component={TelaLista}
      title='Usuários Cadastrados'
      hideNavBar={false}
    />
    <Scene
      key='telaEdicao'
      component={TelaEdicao}
      title='Atualizar Dados'
      hideNavBar={false}
    />
  </Router>
);
