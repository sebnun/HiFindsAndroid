import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, Image, Linking } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query ($query: String!, $page: Int!) {
  search(query: $query, page: $page) {
    ... on Item {
      _id,
      hearts,
      title,
      image,
      price,
      dataid,
    }
    ... on Set {
      _id,
      title,
      subtitle,
      image,
      dataid
      hearts
    }
  }
}`;

let currentPage = 0;

class SearchGrid extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: this.ds.cloneWithRows([])
        };
    }

    render() {
        return (
            <View style={{ backgroundColor: '#f5f5f5' }}>

                <ListView
                    ref="listView"
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    onEndReached={this.props.loadNextPage}
                    contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 100 }}
                    />
            </View>
        )
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loading) {
            this.setState({ dataSource: this.ds.cloneWithRows(nextProps.search) });
        }
    }

    renderRow(data) {
        return (
            <View style={{
                margin: 10,
                padding: 10,
                elevation: 1,
                backgroundColor: '#ffffff',
                width: 250,
                height: 250,

            }}>

                {data.dataid.includes('-') ?

                    <TouchableOpacity onPress={() => this.props.navigator.push({ id: 'collection', dataid: data.dataid, name: `${data.title} ${data.subtitle}` })}>
                        <Text style={{ textAlign: 'center', color: 'darkgrey', paddingBottom: 5 }}>
                            Collection
                            <Text style={{ color: 'dimgrey' }}> {data.title}</Text>
                            <Text style={{ color: 'black' }}> {data.subtitle}</Text>
                        </Text>
                        <Image
                            style={{ height: 220 }}
                            resizeMode={'contain'}
                            source={{ uri: data.image }}
                            />

                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => Linking.openURL(`https://www.amazon.com/dp/${data.dataid}/?tag=hifindsandroid-20`)}>
                        <Image
                            style={{ height: 245 }}
                            resizeMode={'contain'}
                            source={{ uri: data.image }}
                            />
                    </TouchableOpacity>
                }


            </View>
        );
    }
}

const SearchGridQL = graphql(query, {
    props({ data: { loading, search, fetchMore } }) {
        return {
            loading,
            search,
            loadNextPage() {
                return fetchMore({
                    variables: {
                        page: currentPage += 1,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult.data) { return prev; }
                        return Object.assign({}, prev, {
                            search: [...prev.search, ...fetchMoreResult.data.search],
                        });
                    },
                });
            },
        };
    },
})(SearchGrid);

export default SearchGridQL;