import React, { Component, PropTypes } from 'react';
import {
  Animated,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class AutoCompleteInput extends Component {

  static propTypes = {
    style: View.propTypes.style,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    optionHeight: PropTypes.number,
  };

  static defaultProps = {
    options: [],
    optionHeight: 30,
  };

  constructor(props) {
    super(props);

    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.adjustHeight = this.adjustHeight.bind(this);

    this.state = {
      searchStr: props.value,
      openAnim: new Animated.Value(0),
      visibleOptions: props.options,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchStr: nextProps.value,
    });
  }

  onFocus() {
    this.adjustHeight();
  }

  onChangeSearch(searchStr) {
    const { options } = this.props;
    const lowerSearch = searchStr.toLowerCase();
    const visibleOptions = options.filter(o => {
      const lowerOption = o.toLowerCase();
      return lowerOption.indexOf(lowerSearch) > -1 && lowerOption !== lowerSearch;
    });

    this.setState({
      searchStr,
      visibleOptions,
    }, this.adjustHeight);
  }

  adjustHeight() {
    const { optionHeight } = this.props;
    const { openAnim, visibleOptions } = this.state;

    Animated.timing(openAnim, {
      toValue: visibleOptions.length * optionHeight,
      duration: 300,
    }).start();
  }

  renderDropdown() {
    const { optionHeight } = this.props;
    const { visibleOptions, openAnim } = this.state;
    const elements = visibleOptions.map(o => (
      <TouchableOpacity
        key={o}
        onPress={() => this.onChangeSearch(o)}
      >
        <Text style={{ height: optionHeight }}>
          {o}
        </Text>
      </TouchableOpacity>
    ));

    return (
      <Animated.View
        style={[styles.dropdown, {
          height: openAnim,
        }]}
      >
        {elements}
      </Animated.View>
    );
  }

  render() {
    const {
      placeholder,
      style,
    } = this.props;
    const { searchStr } = this.state;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={searchStr}
          onChangeText={this.onChangeSearch}
          onFocus={this.onFocus}
        />
        {this.renderDropdown()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    overflow: 'hidden',
    bottom: 50,
    left: 0,
    right: 0,
    backgroundColor: '#b2378d',
  },
});
