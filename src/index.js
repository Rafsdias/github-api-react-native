import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './routes';

export default function App() {
  return (
    //StatusBar adiciona a cor na parte de cima do ecra no sitio das horas e notificações
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159C1" />
      <Routes />
    </>
  );
}
