// panes - reducers - Tabs 标签内容 管理
import { combineReducers } from 'redux'

import { ADD_PANE, REMOVE_PANE, GET_PANE } from '../constants/ActionTypes'

import { cloneDeep } from 'lodash' // 拷贝

const initialState = {
    activeKey: '', // panes[0].key
    panes: []
}

const setPanes = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PANE:
            let addState = cloneDeep(state) // 深拷贝 state
            addState.panes.push(action.addObj) // 将 action 传递过来的 obj, 存入数组
            return addState // 返回新的 addState
        case REMOVE_PANE:
            let activeKey = action.activeKey
            let lastIndex

            state.panes.forEach((pane, i) => {
                // key为 pane中 route属性值中的path属性;
                if (pane.route.path === action.targetKey) {
                    lastIndex = i - 1
                }
            })

            const panes = state.filter(pane => pane.route.path !== action.targetKey)

            if (lastIndex >= 0 && activeKey === action.targetKey) {
                activeKey = panes[lastIndex].route.path
            }

            // 返回新的 removeState; 不需要拷贝, 直接返回新对象
            let removeState = {
                panes,
                activeKey
            }

            return removeState
        case GET_PANE:
            return state
        default:
            return state
    }
}

export default combineReducers({ setPanes })

export const getPanes = (state) =>
    state.setPanes
