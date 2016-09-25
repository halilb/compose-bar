import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AutoCompleteInput from './AutoCompleteInput';

export default class ComposeBar extends Component {

  static propTypes = {
    subject: PropTypes.string,
    topic: PropTypes.string,
    subjectOptions: PropTypes.array,
    topicOptions: PropTypes.array,
    people: PropTypes.array,
  };

  static defaultProps = {
    subjectOptions: [],
    topicOptions: [],
    people: [],
  };

  constructor(props) {
    super(props);

    this.togglePrivateMessage = this.togglePrivateMessage.bind(this);

    this.state = {
      privateMessage: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subject) {
      this.setState({
        privateMessage: false,
      });
    }
  }

  togglePrivateMessage() {
    this.setState({
      privateMessage: !this.state.privateMessage,
    });
  }

  renderSubjectTopicRow() {
    const {
      subject,
      topic,
      subjectOptions,
      topicOptions,
    } = this.props;

    return (
      <View style={styles.row}>
        <AutoCompleteInput
          style={styles.input}
          value={topic}
          placeholder={'Stream'}
          options={topicOptions}
        />
        <Icon
          style={styles.icon}
          name="chevron-right"
          size={15}
          color="black"
        />
        <AutoCompleteInput
          style={styles.input}
          value={subject}
          placeholder={'Topic'}
          options={subjectOptions}
        />
        <TouchableOpacity onPress={this.togglePrivateMessage}>
          <Icon
            style={styles.icon}
            name="user"
            size={15}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderPrivateMessageRow() {
    const { people } = this.props;

    return (
      <View style={styles.row}>
        <AutoCompleteInput
          style={styles.input}
          placeholder={'Person'}
          options={people}
        />
        <TouchableOpacity onPress={this.togglePrivateMessage}>
          <Icon
            style={styles.icon}
            name="bullhorn"
            size={15}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { privateMessage } = this.state;

    return (
      <View style={styles.container}>
        {privateMessage && this.renderPrivateMessageRow()}
        {!privateMessage && this.renderSubjectTopicRow()}
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
