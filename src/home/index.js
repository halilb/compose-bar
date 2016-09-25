import React, { Component } from 'react';

import {
  TouchableOpacity,
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

    this.renderRow = this.renderRow.bind(this);

    const dataSource = new ListView.DataSource({
      rowHasChanged: () => false,
      sectionHeaderHasChanged: () => false,
    });

    const dataBlob = {};
    const subjectOptions = [];
    const topicOptions = [];
    const people = [];

    Data.forEach(message => {
      const {
        display_recipient: topic,
        subject,
        sender_full_name: author,
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
      if (people.indexOf(author) === -1) {
        people.push(author);
      }
    });

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob),
      subjectOptions,
      topicOptions,
      people,
    };
  }

  selectRow(rowData) {
    this.setState({
      selectedTopic: rowData.display_recipient,
      selectedSubject: rowData.subject,
    });
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <Text style={styles.sectionHeader}>{sectionID}</Text>
    );
  }

  renderRow(rowData) {
    return (
      <TouchableOpacity onPress={() => this.selectRow(rowData)}>
        <View style={styles.row}>
          <Text style={styles.author}>{rowData.sender_full_name}</Text>
          <Text style={styles.message}>{rowData.content}</Text>
          <View style={styles.separator} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {
      dataSource,
      selectedTopic,
      selectedSubject,
      subjectOptions,
      topicOptions,
      people,
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
          subject={selectedSubject}
          topic={selectedTopic}
          subjectOptions={subjectOptions}
          topicOptions={topicOptions}
          people={people}
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
});
