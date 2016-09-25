import React, { Component } from 'react';

import {
  Text,
  View,
  ListView,
  StyleSheet,
} from 'react-native';

import ComposeBar from '../composebar';
import Data from './data';

export default class Demo extends Component {

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: () => false,
      sectionHeaderHasChanged: () => false,
    });

    const dataBlob = {};
    const subjectOptions = [];
    const topicOptions = [];

    Data.forEach(message => {
      const {
        display_recipient: topic,
        subject,
      } = message;
      const sectionName = `${topic} > ${subject}`;
      if (!dataBlob[sectionName]) {
        dataBlob[sectionName] = [];
      }
      dataBlob[sectionName].push(message);

      if (subjectOptions.indexOf(subject) === -1) {
        subjectOptions.push(subject);
      }
      if (topicOptions.indexOf(topic) === -1) {
        topicOptions.push(topic);
      }
    });

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob),
      subjectOptions,
      topicOptions,
    };
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <Text style={styles.sectionHeader}>{sectionID}</Text>
    );
  }

  renderRow(rowData) {
    return (
      <View style={styles.row}>
        <Text style={styles.author}>{rowData.sender_full_name}</Text>
        <Text style={styles.message}>{rowData.content}</Text>
        <View style={styles.separator} />
      </View>
    );
  }

  render() {
    const {
      dataSource,
      subjectOptions,
      topicOptions,
    } = this.state;

    return (
      <View style={styles.container}>
        <ListView
          style={styles.list}
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
        <ComposeBar
          subjectOptions={subjectOptions}
          topicOptions={topicOptions}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 40,
    backgroundColor: '#eeeeee',
  },
  sectionHeader: {
    marginTop: 16,
    padding: 5,
    fontWeight: '500',
    fontSize: 11,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  author: {
    padding: 16,
    fontWeight: 'bold',
  },
  message: {
    padding: 16,
    paddingTop: 0,
  },
  separator: {
    height: 3,
    backgroundColor: '#bbbbbb',
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20,
  },
});
