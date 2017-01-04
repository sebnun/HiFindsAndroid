import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, ToolbarAndroid } from 'react-native';

import CollectionGrid from '../components/CollectionGrid';

export default class CollectionScene extends Component {
    render() {
        return (
            <View>
                <View style={this.props.style.navBarViewBorder}>
                    <ToolbarAndroid
                        title="HiFinds"
                        style={this.props.style.navBar}
                        subtitle={this.props.name}
                        actions={[
                            { title: 'Latest' },
                            { title: 'Collections' },
                            { title: 'Brands' },
                            { title: 'Search' }
                        ]}
                        onActionSelected={this.onActionSelected.bind(this)}
                        />
                </View>

                <CollectionGrid page={0} dataid={this.props.dataid} />

            </View>
        )
    }

    onActionSelected(index) {
        if (index === 0) {
            this.props.navigator.resetTo({ id: 'home' })
        } else if (index === 1) {
            this.props.navigator.resetTo({ id: 'collections' })
        } else if (index === 2) {
            this.props.navigator.resetTo({ id: 'brands' })
        } else if (index === 3) {
            this.props.navigator.resetTo({ id: 'search' })
        }
    }

}