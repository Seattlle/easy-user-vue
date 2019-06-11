import { setStore, getStore } from '@/util/store'
import { diff } from '@/util/util'
import website from '@/const/website'
import { getMenu, getMenuAll} from '@/api/user'
import { encryption, deepClone } from '@/util/util'

const isFirstPage = website.isFirstPage;
const tagWel = website.fistPage;
const tagObj = {
        label: '', //标题名称
        value: '', //标题的路径
        params: '', //标题的路径参数
        query: '', //标题的参数
        group: [], //分组
    }
    //处理首个标签
function setFistTag(list) {
    if (list.length == 1) {
        list[0].close = false;
    } else {
        list.forEach(ele => {
            if (ele.value === tagWel.value && isFirstPage === false) {
                ele.close = false
            } else {
                ele.close = true
            }
        })
    }
}

function addPath(ele, first) {
    const propsConfig = website.menu.props;
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild && first) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
        return
    }
    ele[propsDefault.children].forEach(child => {
        if (!isURL(child[propsDefault.path])) {
            child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path]?child[propsDefault.path]:'index'}`
        }
        addPath(child);
    })
}


const navs = {
    state: {
        tagList: getStore({ name: 'tagList' }) || [],
        tag: getStore({ name: 'tag' }) || tagObj,
        tagWel: tagWel,
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        CurrentMenu:JSON.parse(getStore({ name: 'CurrentMenu' }) || '{}')
    },
    actions: {
        //获取系统菜单
        GetMenu({ commit }, type) {
            return new Promise(resolve => {
                getMenu(type).then((res) => {
                    const data = res.data
                    let menu = deepClone(data);

                    menu.forEach(ele => {
                        try {
                            ele.meta=typeof ele.meta==="string"?JSON.parse(ele.meta||'{}'):ele.meta;
                        }catch (e) {
                            console.error(ele.label+'的meta不是一个有效的JSON字段！');
                        }
                        addPath(ele, true);
                    })
                    commit('SET_MENU', menu)
                    resolve(menu)
                })
            })
        },
        //获取全部菜单
        GetMenuAll({ commit }) {
            return new Promise(resolve => {
                getMenuAll().then((res) => {
                    const data = res.data;
                    commit('SET_MENU_ALL', data);
                    resolve(data);
                })
            })
        },
    },
    mutations: {
        SET_MENU: (state, menu) => {
            state.menu = menu;
            setStore({ name: 'menu', content: state.menu, type: 'session' })
        },
        SET_MENU_ALL: (state, menuAll) => {
            state.menuAll = menuAll;
        },

        ADD_TAG: function (state, action) {
            for(let i in state.menu){
                let item=state.menu[i];
                if(item.path===action.value){
                    this.commit('SET_CURRENT_MENU', item);
                    break;
                }
            }
            state.tag = action;
            setStore({ name: 'tag', content: state.tag, type: 'session' })
            if (state.tagList.some(ele => diff(ele, action))) return
            state.tagList.push(action)
            setFistTag(state.tagList);
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        DEL_TAG: (state, action) => {
            state.tagList = state.tagList.filter(item => {
                return !diff(item, action);
            })
            setFistTag(state.tagList);
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        DEL_ALL_TAG: (state) => {
            state.tagList = [state.tagWel];
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        DEL_TAG_OTHER: (state) => {
            state.tagList = state.tagList.filter(item => item.value === state.tag.value)
            setFistTag(state.tagList);
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        SET_CURRENT_MENU: (state, menu) => {
            state.CurrentMenu = menu || {};
            setStore({
                name: 'CurrentMenu',
                content: JSON.stringify(state.CurrentMenu),
                type: 'session'
            })
        },
    }
}
export default navs
