import React, { Component } from 'react';
import { AppRegistry, Navigator, StyleSheet, BackAndroid } from 'react-native';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import HomeScene from './scenes/HomeScene';
import BrandScene from './scenes/BrandScene';
import BrandsScene from './scenes/BrandsScene';
import CollectionScene from './scenes/CollectionScene';
import CollectionsScene from './scenes/CollectionsScene';
import SearchScene from './scenes/SearchScene';

export default class HiFinds extends Component {
  constructor(props) {
    super(props);

    this.navigator;

    this.client = new ApolloClient({
      networkInterface: createNetworkInterface({ uri: 'https://hifinds.com/graphql' })
    });
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }
      return false;
    });
  }

  render() {
    return (
      <ApolloProvider client={this.client}>
        <Navigator
          initialRoute={{ id: 'home' }}

          renderScene={(route, navigator) => {
            this.navigator = navigator;

            if (route.id === 'home') {
              return <HomeScene navigator={navigator} style={styles} />
            } else if (route.id === 'brand') {
              return <BrandScene navigator={navigator} name={route.name} style={styles} />
            } else if (route.id === 'brands') {
              return <BrandsScene navigator={navigator} style={styles} />
            } else if (route.id === 'collection') {
              return <CollectionScene navigator={navigator} dataid={route.dataid} name={route.name} style={styles} />
            } else if (route.id === 'collections') {
              return <CollectionsScene navigator={navigator} style={styles} />
            } else if (route.id === 'search') {
              return <SearchScene navigator={navigator} style={styles} />
            }
          }
          }
          />
      </ApolloProvider>
    );
  }

}

const styles = StyleSheet.create({
  navBar: {
    height: 70,
    backgroundColor: '#ffffff'
  },
  navBarViewBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  }
})

AppRegistry.registerComponent('hifinds', () => HiFinds);
