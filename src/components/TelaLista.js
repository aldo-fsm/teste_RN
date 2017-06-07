import React from 'react';
import { View, StatusBar } from 'react-native';
import ListaUsuarios from './ListaUsuarios';

export default () => (
  <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#EBEBEB' }}>
    <StatusBar backgroundColor='#184896' />
    <ListaUsuarios />
  </View>
);