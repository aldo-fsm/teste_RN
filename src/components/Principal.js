import React from 'react';
import { Actions } from 'react-native-router-flux';
import {
  View,
  StyleSheet,
  Button,
  StatusBar
} from 'react-native';

export default () => (
  <View style={{ flex: 1, padding: 10 }}>
    <StatusBar backgroundColor='#8b8b8bd7' />
    <View style={{ flex: 4 }} ></View>
    <View style={{ flex: 3, justifyContent: 'flex-start' }}>
      <View style={styles.buttonStyle}>
        <Button
          title='Novo Cadastro'
          color='#184896'
          onPress={() => Actions.telaCadastro()}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Button
          title='Lista de Cadastros'
          color='#184896'
          onPress={() => Actions.telaLista()}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    marginHorizontal: 50,
  }
});
