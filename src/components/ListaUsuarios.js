import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, Text } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { setLista, push } from '../actions/ActionsLista';
import DadosUsuario from './DadosUsuario';


class ListaUsuarios extends Component {

  constructor(props) {
    super(props);
    this.usersRef = firebase.database().ref('cadastros');
    this.state = { vazia: false };
  }
  componentWillMount() {
    this.usersRef.on('value', snap => {
      const lista = [];
      if (snap.hasChildren()) {
        this.setState({ vazia: false });
        snap.forEach(child => {
          lista.push({
            user: child.val(),
            id: child.key
          });
        });
      } else {
        this.setState({ vazia: true });
      }
      this.props.setLista(lista);
    });
  }
  renderList() {
    if (this.props.lista.length === 0) {
      if (this.state.vazia) {
        return (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginTop: 50 }} >
              Não há usuários cadastrados.
            </Text>
          </View>
        );
      }
      return (
        <View style={{ flex: 1, padding: 200, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
    return this.props.lista.map(dados => <DadosUsuario key={dados.id}{...dados} />);
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <ScrollView>
          {this.renderList()}
        </ScrollView>
      </View>
    );
  }
}

const mapStatesToProps = state => ({
  lista: state.ReducerLista.lista
});

export default connect(mapStatesToProps, { setLista, push })(ListaUsuarios);
