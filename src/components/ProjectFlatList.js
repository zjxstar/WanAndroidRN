import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import globalStyles from '../styles/globalStyles'
import ProjectItem from './ProjectItem';
import CommonFlatList from './CommonFlatList';
import { getProjects } from '../api';
import { getRealDP as dp } from '../utils/screenUtil';
import { favorArticleInner, uncollectArticleInList } from '../api';

/**
 * 项目列表
 * 这里不使用Redux
 */
class ProjectFlatList extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            isFetching: false,
            page: 1,
            projectsObj: {},
            projects: [],
            isFullData: false,
        }
        
        this.renderListItem = this.renderListItem.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.loadMoreProjects = this.loadMoreProjects.bind(this)
        this.renderBlankDivider = this.renderBlankDivider.bind(this)
        this.favorArticle = this.favorArticle.bind(this)
    }

    componentDidMount() {
        this.refreshList()
    }

    renderListItem({item, index}) {
        const { navigation } = this.props
        return (
            <ProjectItem navigation={navigation} item={item} onFavorClick={() => this.favorArticle(item, index)} />
        )
    }

    favorArticle(item, index) {
        if (item.collect) {
            // 取消收藏
            uncollectArticleInList(item.id).then(res => {
                let tempProjects = [...this.state.projects]
                tempProjects[index].collect = false
                this.setState({
                    projects: tempProjects
                })
                global.toast.show('已取消收藏')
            }).catch(err => {
                global.toast.show(err)
            })
        } else {
            // 收藏文章
            favorArticleInner(item.id).then(res => {
                let tempProjects = [...this.state.projects]
                tempProjects[index].collect = true
                this.setState({
                    projects: tempProjects
                })
                global.toast.show('收藏成功')
            }).catch(err => {
                global.toast.show(err)
            })
        }
    }

    renderBlankDivider() {
        return (
            <View style={{ height: dp(14) }} />
        )
    }

    refreshList() {
        const { cid } = this.props
        let that = this
        this.setState({
            isFetching: true
        })
        
        getProjects(cid).then(
            res => {
                let projectsObj = res.data
                that.setState({
                    isFetching: false,
                    page: 2,
                    projectsObj: projectsObj,
                    projects: projectsObj.datas,
                    isFullData: projectsObj.curPage === projectsObj.pageCount
                })
            }
        ).catch(
            err => {
                that.setState({
                    isFetching: false,
                })
            }
        )
 
    }

    loadMoreProjects() {
        const { cid } = this.props
        if (this.state.isFullData) {
            return
        }
        let that = this
        getProjects(cid, this.state.page).then(
            res => {
                let projectsObj = res.data
                that.setState({
                    isFetching: false,
                    page: ++that.state.page,
                    projects: that.state.projects.concat(projectsObj.datas),
                    isFullData: projectsObj.datas.length === 0
                })
            }
        ).catch(
            err => {
                that.setState({
                    isFetching: false,
                })
            }
        )
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <CommonFlatList
                    data={this.state.projects}
                    renderItem={this.renderListItem}
                    ListHeaderComponent={this.renderBlankDivider}
                    ListFooterComponent={this.renderBlankDivider}
                    keyExtractor={(item, index) => item.id.toString()}
                    onEndReached={this.loadMoreProjects}
                    refreshing={this.state.isFetching}
                    onRefresh={this.refreshList} />
            </View>
        )
    }
}

export default ProjectFlatList