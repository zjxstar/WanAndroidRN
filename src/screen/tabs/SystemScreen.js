import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import SystemCard from '../../components/SystemCard';
import { connect } from 'react-redux';
import { fetchSystemTree } from '../../actions'
import CommonFlatList from '../../components/CommonFlatList';
import { getRealDP as dp } from '../../utils/screenUtil';

/**
 * 知识体系
 */
class SystemScreen extends PureComponent {

    constructor(props) {
        super(props)
        this.renderListItem = this.renderListItem.bind(this)
        this.refreshSystemTree = this.refreshSystemTree.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
    }

    componentDidMount() {
        this.props.reqSystemTree()
    }

    renderListItem({ item, index }) {
        const { navigation } = this.props
        if (item.children.length == 0) {
            return null
        }
        return (
            <SystemCard classification={item} navigation={navigation} />
        )
    }

    renderFooter() {
        return (
            <View style={{height: dp(14)}} />
        )
    }

    refreshSystemTree() {
        console.log('refresh sys tree')
        this.props.reqSystemTree()
    }

    render() {
        const { isFetching, systemTree, navigation } = this.props
        return (
            <View style={globalStyles.container}>
                <HeaderBar title='知识体系' navigation={navigation} />

                <CommonFlatList
                    data={systemTree}
                    renderItem={this.renderListItem}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListFooterComponent={this.renderFooter}
                    refreshing={isFetching}
                    onRefresh={this.refreshSystemTree} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        systemTree: state.systemTree.systemTree,
        isFetching: state.systemTree.isFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqSystemTree: () => dispatch(fetchSystemTree())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemScreen)