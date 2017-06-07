import React from 'react';
import { View, StatusBar } from 'react-native';

import Formulario from './Formulario';

export default () => (
  <View style={{ flex: 1, paddingTop: 50 }}>
    <StatusBar backgroundColor='#184896' />
    <Formulario type='cadastro' />
  </View>
);
