import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Usuários',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState.users !== this.state.users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  //Navegar para a pagina user quando o botão ver perfil for clicado
  handleNavigate = user => {
    const {navigation} = this.props;

    navigation.navigate('User', {user});
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    this.setState({loading: true});

    //variavel response fica com os dados da api do user digitado
    const response = await api.get(`/users/${newUser}`);

    // como não preciso de todos os dados do usuário, foi criado o data para escolher que dados pegar
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    console.log(users);
    Keyboard.dismiss(); // Para fechar o teclado depois de clicar no botao
  };

  render() {
    const {users, newUser, loading} = this.state; // Para conseguir listar os usuarios

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={text => this.setState({newUser: text})}
            returnKeyType="send" //tecla de enviar no teclado
            onSubmitEditing={this.handleAddUser} //metodo a executar quando a tecla de enviar é clicada diretamente do teclado em vez do botão
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? ( // Se o loading for true ele chama o ActivityIndicator se não mostra o icon normal
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users} // Onde vão estar os dados da list (precisa ser array)
          keyExtractor={user => user.login} // É tipo a key da web (é a propriedade única dentro de cada usuário)
          // Por cada item que é cada user, ele "cria um layout" desta forma:
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
