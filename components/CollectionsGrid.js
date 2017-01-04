import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, Image, Linking } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query ($filter: String, $page: Int!) {
  sets(filter: $filter, page: $page) {
      title,
      subtitle,
      image,
      dataid,
      hearts
  }
}`;

let currentPage = 0;
let filter;

class CollectionsGrid extends Component {
    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            currentFilter: 'lmao'
        };
    }

    render() {
        filter = this.props.filter;

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

            if (nextProps.filter !== this.state.currentFilter) { //changed to a new tab
                this.currentPage = 0;
                this.refs.listView.scrollTo({ x: 0, y: 0, animated: false });
                this.setState({ dataSource: this.ds.cloneWithRows([]), currentFilter: nextProps.filter });
            }

            this.setState({ dataSource: this.ds.cloneWithRows(nextProps.sets) });
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
            </View>
        );
    }
}

const CollectionsGridQL = graphql(query, {
    props({ data: { loading, sets, fetchMore } }) {
        return {
            loading,
            sets,
            loadNextPage() {
                return fetchMore({
                    variables: {
                        filter,
                        page: currentPage += 1,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult.data) { return prev; }
                        return Object.assign({}, prev, {
                            sets: [...prev.sets, ...fetchMoreResult.data.sets],
                        });
                    },
                });
            },
        };
    },
})(CollectionsGrid);

export default CollectionsGridQL;
