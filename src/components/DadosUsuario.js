import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  setNome,
  setEmail,
  setCelular,
  setNascimento,
  setId
} from '../actions/ActionsCadastro';

const deleteIcon = require('../imgs/delete_icon.png');
const editIcon = require('../imgs/edit_icon.png');

const DadosUsuario = props => (
  <View style={{ margin: 10, backgroundColor: 'white', borderRadius: 5, elevation: 5 }}>
    <View style={{ padding: 5 }}>
      <View style={{ paddingVertical: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.txtNome}>{props.user.nome}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              props.setId(props.id);
              props.setNome(props.user.nome);
              props.setEmail(props.user.email);
              props.setNascimento(props.user.nascimento);
              props.setCelular(props.user.celular);
              Actions.telaEdicao();
            }}
          >
            <Image source={editIcon} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() => {
              const nome = props.user.nome;
              Alert.alert(
                `Deseja remover o cadastro de ${nome}?`,
                '',
                [{
                  text: 'sim',
                  onPress: () => {
                    firebase.database().ref(`cadastros/${props.id}`)
                      .remove()
                      .then(() => Alert.alert(`${nome} foi removido com sucesso`))
                      .catch(() => Alert.alert(`Não foi possível remover ${nome}`));
                } }, { text: 'Não', onPress: () => false }],
              );
            }}
          >
            <Image source={deleteIcon} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ paddingLeft: 5 }}>
        <Text style={styles.txtDetalhes}>E-mail : {props.user.email}</Text>
        <Text style={styles.txtDetalhes}>Data de nascimento : {props.user.nascimento}</Text>
        <Text style={styles.txtDetalhes}>Celular : {props.user.celular}</Text>
      </View>
    </View>

  </View>
);
const styles = StyleSheet.create({
  txtDetalhes: {
    fontSize: 15,
  },
  txtNome: {
    fontSize: 18,
    color: 'black'
  }
});

const actions = {
  setNome,
  setCelular,
  setEmail,
  setNascimento,
  setId
};

export default connect(null, actions)(DadosUsuario);
