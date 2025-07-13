/**
 * @format
 */
import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import MainRout from './src/Root/MainRout';
import { name as appName } from './app.json';
import store from './src/Redux/store';

const RNRedux = () => (
  <Provider store={store}>
    <MainRout />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
