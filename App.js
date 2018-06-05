import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddEntry from './components/add-entry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import History from './components/history';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <View style={{height: 20}} />
          <History />
        </View>
      </Provider>
    );
  }
}
