import React, { Component, PropTypes } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class ComposeBar extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={'Stream'}
          />
          <Icon
            style={styles.icon}
            name="chevron-right"
            size={15}
            color="black"
          />
          <TextInput
            style={styles.input}
            placeholder={'Topic'}
          />
          <Icon
            style={styles.icon}
            name="user"
            size={15}
            color="black"
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder={'Tap on a message to compose reply'}
          />
          <Icon
            style={styles.icon}
            name="paper-plane"
            size={15}
            color="black"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E2E2E2',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingLeft: 16,
  },
  icon: {
    padding: 16,
  },
  input: {
    flex: 1,
  },
});
