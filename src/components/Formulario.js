import React, { Component } from 'react';
import {
  TextInput,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';

import {
  setNome,
  setEmail,
  setCelular,
  setNascimento,
  setImage,
  cadastrar,
  atualizarCadastro,
  reset
} from '../actions/ActionsCadastro';
 
const userDefault = require('../imgs/user-default.png');

class Formulario extends Component {

  componentWillUnmount() {
    this.props.reset();
  }
  pickPhoto() {
    Alert.alert('Foto', '',
    [
      {
        text: 'Galeria', 
        onPress: () => {
          ImagePicker.openPicker({
            width: 900,
            height: 900,
            cropping: true
          }).then(image => {
            this.props.setImage(image);
            console.log(image);
          });
        }
      },
      {
        text: 'Camera',
        onPress: () => {
          ImagePicker.openCamera({
            width: 900,
            height: 900,
            cropping: true
          }).then(image => {
            this.props.setImage(image);
            console.log(image);
          });
        }
      }
    ]);
  }
  renderButton() {
    if (this.props.loading) {
      return <ActivityIndicator size='large' />;
    }
    switch (this.props.type) {
      case 'cadastro':
        return (
          <Button
            style={{ padding: 70 }}
            title='Cadastrar'
            color='#1f4e9b'
            onPress={() => this.props.cadastrar(this.props)}
          />
        );
      case 'edicao':
        return (
          <Button
            style={{ padding: 70 }}
            title='Salvar Alterações'
            color='#1f4e9b'
            onPress={() => this.props.atualizarCadastro(this.props)}
          />
        );
      default:
        return false;
    }
  }

  render() {
    return (
      <ScrollView style={{ padding: 10, paddingTop: 40 }}>
        <View style={{ flex: 1, alignItems: 'center', marginBottom: 5 }}>
          <TouchableOpacity 
            style={{ 
              elevation: 10, 
              backgroundColor: 'white', 
              borderWidth: 2, 
              borderRadius: 5, 
              borderColor: '#1f4e9b' }}
            onPress={() => this.pickPhoto()}
          >
            <Image 
              style={{ width: 150, height: 150 }}
              source={
                this.props.image ? 
                { uri: this.props.image.path }
                : 
                userDefault 
              }
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textInputStyle}
          value={this.props.nome}
          onChangeText={text => this.props.setNome(text)}
          placeholder='Nome'
        />
        <TextInput
          placeholder='E-mail'
          style={styles.textInputStyle}
          onChangeText={text => this.props.setEmail(text)}
          value={this.props.email}
          keyboardType='email-address'
        />
        <TextInputMask
          ref='dateInput'
          placeholder='Data de nascimento'
          style={styles.textInputStyle}
          value={this.props.nascimento}
          onChangeText={text => this.props.setNascimento(text)}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
        />
        <TextInputMask
          ref='phoneInput'
          placeholder='Celular'
          style={styles.textInputStyle}
          value={this.props.celular}
          onChangeText={text => this.props.setCelular(text)}
          type={'cel-phone'}
          options={{
            format: '(99)9999-9999'
          }}
        />
        <Text style={styles.erroMessageStyle}>{this.props.errorMessage}</Text>
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          {this.renderButton()}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  textInputStyle: {
    height: 40
  },
  erroMessageStyle: {
    color: 'red',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 18,
    height: 100
  }
});
const mapStatesToProps = state => ({
  nome: state.ReducerCadastro.nome,
  email: state.ReducerCadastro.email,
  nascimento: state.ReducerCadastro.nascimento,
  celular: state.ReducerCadastro.celular,
  id: state.ReducerCadastro.id,
  image: state.ReducerCadastro.image,
  errorMessage: state.ReducerCadastro.errorMessage,
  loading: state.ReducerCadastro.loading
});

const actions = {
  setNome,
  setCelular,
  setEmail,
  setNascimento,
  setImage,
  cadastrar,
  atualizarCadastro,
  reset
};

export default connect(mapStatesToProps, actions)(Formulario);
