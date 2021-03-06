/**
 * Created by dowin on 2017/11/28.
 */
'use strict'
import React, {Component} from 'react'
import {requireNativeComponent, ScrollView, View} from 'react-native'
import PropTypes from 'prop-types'
const UIManager = require('react-native/lib/UIManager')
const ReactNative = require('react-native')
const REF_PTR = "ptr_ref"

export default class PullToRefreshScrollView extends Component {

    static defaultProps = {
        durationToCloseHeader: 300,//关闭延时
        durationToClose: 200,//向上关闭的时间
        resistance: 2,
        pinContent: false,
        ratioOfHeaderHeightToRefresh: 1.2,
        pullToRefresh: false,
        keepHeaderWhenRefresh: true,
        refreshing: false,//设置false结束否刷新
        refreshableTitlePull: '下拉刷新',
        refreshableTitleRefreshing: '加载中...',
        refreshableTitleRelease: '松手开始刷新',
        refreshableTitleComplete: '刷新完成.',
        dateTitle: '最后更新时间: ',
        titleColor:"#666666",//刷新文字颜色
        lastUpdateColor:"#999999",//更新时间文字颜色
        progressDrawable:"rotate_d",//刷新时动画drawable名字
        arrowDrawable: 'ptr_rotate_arrow_1'//箭头图片drawable名字
    }

    constructor (props) {
        super(props)
        this._onRefresh = this._onRefresh.bind(this)
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.refreshing === false && nextProps.refreshing !== this.props.refreshing) {
            this.onRefreshEnd()
        }
    }
    _onRefresh () {
        if (!this.props.onRefresh) {
            return
        }
        this.props.onRefresh()
    }

    autoRefresh () {
        let self = this
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(self.refs[REF_PTR]),
            1,
            null
        )
    }

    onRefreshEnd () {
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this.refs[REF_PTR]),
            0,
            null
        )
    }
    render () {
        // onPtrRefresh 事件对应原生的ptrRefresh事件
        return (
            <RCTPtrAndroid
                ref={REF_PTR}
                {...this.props}
                style={{flex:1}}
                onPtrRefresh={() => this._onRefresh()}>
                <ScrollView>
                    {this.props.children}
                </ScrollView>
            </RCTPtrAndroid>
        )
    }
}

// PullToRefreshScrollView.name = "RCTPtrAndroid"; // 便于调试时显示(可以设置为任意字符串)
PullToRefreshScrollView.propTypes = {
    onPtrRefresh: PropTypes.func,
    resistance: PropTypes.number,
    durationToCloseHeader: PropTypes.number,
    durationToClose: PropTypes.number,
    ratioOfHeaderHeightToRefresh: PropTypes.number,
    pullToRefresh: PropTypes.bool,
    keepHeaderWhenRefresh: PropTypes.bool,
    pinContent: PropTypes.bool,
    refreshableTitlePull: PropTypes.string,
    refreshableTitleRefreshing: PropTypes.string,
    refreshableTitleRelease: PropTypes.string,
    refreshableTitleComplete: PropTypes.string,
    dateTitle: PropTypes.string,
    titleColor: PropTypes.string,
    lastUpdateColor: PropTypes.string,
    progressDrawable: PropTypes.string,
    arrowDrawable: PropTypes.string,
    ...View.propTypes,
};

const RCTPtrAndroid = requireNativeComponent('RCTPtrAndroid', PullToRefreshScrollView, {nativeOnly: {onPtrRefresh: true}});
