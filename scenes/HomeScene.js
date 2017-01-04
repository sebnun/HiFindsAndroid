import React, { Component } from 'react';
import { View, ToolbarAndroid } from 'react-native';

import TabBarAndroid from '../components/TabBarAndroid';
import LatestGrid from '../components/LatestGrid';

export default class HomeScene extends Component {

    constructor(props) {
        super(props);

        this.state = { tab: 'all' };
    }

    render() {

        return (
            <View>

                <ToolbarAndroid
                    title="HiFinds"
                    style={this.props.style.navBar}
                    subtitle="Latest"
                    actions={[
                        { title: 'Latest' },
                        { title: 'Collections' },
                        { title: 'Brands' },
                        { title: 'Search' }
                    ]}
                    onActionSelected={this.onActionSelected.bind(this)}
                    />

                <TabBarAndroid current={this.state.tab} update={(tab) => this.setState({ tab })} />

                <LatestGrid navigator={this.props.navigator} filter={this.state.tab === 'all' ? undefined : this.state.tab} page={0} />

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