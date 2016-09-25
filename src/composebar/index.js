import React, { Component, PropTypes } from 'react';
import {
  Animated,
  Keyboard,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import AutoCompleteInput from './AutoCompleteInput';

export default class ComposeBar extends Component {

  static propTypes = {
    style: View.propTypes.style,
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
    this.onKeyboardShow = this.onKeyboardShow.bind(this);
    this.onKeyboardHide = this.onKeyboardHide.bind(this);

    this.animating = false;

    this.state = {
      privateMessage: false,
      bottomAnim: new Animated.Value(0),
    };
  }

  componentWillMount() {
    this.subscriptions = [
      Keyboard.addListener('keyboardWillShow', this.onKeyboardShow),
      Keyboard.addListener('keyboardWillHide', this.onKeyboardHide),
    ];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subject) {
      this.setState({
        privateMessage: false,
      });
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove());
  }

  onKeyboardShow(event) {
    const { endCoordinates, end } = event;
    const keyboardHeight = endCoordinates ? endCoordinates.height : end.height;
    this.animateComposeBar(keyboardHeight);
  }

  onKeyboardHide() {
    this.animateComposeBar(0);
  }

  animateComposeBar(bottom) {
    if (this.animating) {
      return;
    }

    this.animating = true;
    Animated.timing(
      this.state.bottomAnim, {
        duration: 300,
        toValue: bottom,
      },
    ).start(() => this.animating = false);
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
    const { style } = this.props;
    const { privateMessage, bottomAnim } = this.state;

    return (
      <Animated.View
        style={[styles.container, style, {
          bottom: bottomAnim,
        }]}
      >
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
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#E2E2E2',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
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
