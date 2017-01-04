import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, Image, Linking } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`query ($filter: String, $page: Int!) {
  brands(filter: $filter, page: $page) {
      name,
      image
  }
}`;

let currentPage = 0;
let filter;

class BrandsGrid extends Component {
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

            //some brands are ... and null
            this.setState({ dataSource: this.ds.cloneWithRows(nextProps.brands.filter(b => b.name !== null && b.name !== '...')) });
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

                <TouchableOpacity onPress={() => this.props.navigator.push({ id: 'brand', name: data.name })}>
                    <Text style={{ textAlign: 'center', paddingBottom: 5 }}>
                        {data.name}
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

const BrandsGridQL = graphql(query, {
    props({ data: { loading, brands, fetchMore } }) {
        return {
            loading,
            brands,
            loadNextPage() {
                return fetchMore({
                    variables: {
                        filter,
                        page: currentPage += 1,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult.data) { return prev; }
                        return Object.assign({}, prev, {
                            brands: [...prev.brands, ...fetchMoreResult.data.brands],
                        });
                    },
                });
            },
        };
    },
})(BrandsGrid);

export default BrandsGridQL;