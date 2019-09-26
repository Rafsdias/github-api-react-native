import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Routes = createAppContainer(
  //Forma de mostrar o layout ao user com as diferentes paginas, existem varios tipos com menus em baixo ou em cima,etc...
  createStackNavigator(
    {
      Main,
      User,
      Repository,
    },
    {
      headerLayoutPreset: 'center', //Centra o texto do titulo
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#7159C1', //Coloca cor no background do titulo
        },
        headerTintColor: '#FFF', // Muda a cor do texto do titulo
      },
    },
  ),
);

export default Routes;
