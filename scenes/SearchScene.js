import React, { Component } from 'react';
import { View, TextInput, ToolbarAndroid, Text } from 'react-native';

import SearchGrid from '../components/SearchGrid';

export default class SearchScene extends Component {

    constructor(props) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <View>

                <View style={this.props.style.navBarViewBorder}>
                    <ToolbarAndroid
                        style={this.props.style.navBar}
                        actions={[
                            { title: 'Latest' },
                            { title: 'Collections' },
                            { title: 'Brands' },
                            { title: 'Search' }
                        ]}
                        onActionSelected={this.onActionSelected.bind(this)}
                        >
                        <TextInput
                            //need the space to fill the bar witdth, KISS
                            placeholder="Search                                                                                                                                                               "
                            style={{ flexDirection: 'row' }}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            returnKeyType={'search'}
                            underlineColorAndroid="#FF5656"
                            maxLength={40}
                            />
                    </ToolbarAndroid>
                </View>

                <SearchGrid query={this.state.text} page={0} navigator={this.props.navigator} />
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