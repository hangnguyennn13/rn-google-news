import { StyleSheet, Text, View, ActivityIndicator,FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Card, Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';


export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loading : true,
      articles : [],
      page: 1,
    }
  }

  componentDidMount(){
    this.getNews()
  }

  getNews = async () => {
    console.log("News")
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=bc9a5250443a4ba5adcb14d07a6b83c8&page=${this.state.page}`
    )
    // debugger
    const data = await response.json()
    // console.log(data)
    const articles = this.state.articles.concat(data.articles)
    const newpage = this.state.page+1;
    this.setState({loading:false,articles:articles,page:newpage})
  }

  renderArticleItem = ({ item }) => {
    return (
      <Card title={item.title} image={{uri:item.urlToImage}}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={{marginBottom: 10}}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
      </Card>
    );
  };

  render(){
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large"/>
        </View>
      );
    }
    console.log(this.state.articles[0])
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{this.state.articles.length}</Text>
        </View>
        <FlatList
          data={this.state.articles}
          renderItem={this.renderArticleItem}
          keyExtractor={item => item.title}
          onEndReached={this.getNews} 
          onEndReachedThreshold={1}
        />
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});
