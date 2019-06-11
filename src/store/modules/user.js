import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL } from '@/util/validate'
import { encryption, deepClone } from '@/util/util'
import { loginByUsername, getUserInfo, getMenu, logout, getMenuAll, RefeshToken ,getAllSystem,AddUser,GetAllUsers} from '@/api/user'
import {Message} from "element-ui";

const user = {
    state: {
        userInfo: {},
        permission: {},
        roles: [],
        token: getStore({ name: 'token' }) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo) {
            // const user = encryption({
            //     data: userInfo,
            //     type: 'Aes',
            //     key: webiste.key,
            //     param: ['loginName', 'loginPwd']
            // });
            return new Promise((resolve) => {
                loginByUsername(userInfo).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    setToken(data);
                    resolve();
                }).catch(()=>{})
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    setToken(data);
                    resolve();
                })
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data;
                    const roles='admin';
                    const permission=[
                            'sys_crud_btn_add',
                            'sys_crud_btn_export',
                            'sys_menu_btn_add',
                            'sys_menu_btn_edit',
                            'sys_menu_btn_del',
                            'sys_role_btn1',
                            'sys_role_btn2',
                            'sys_role_btn3',
                            'sys_role_btn4',
                            'sys_role_btn5',
                            'sys_role_btn6',
                        ];

                    commit('SET_USERIFNO', data);
                    commit('SET_ROLES', roles);
                    commit('SET_PERMISSION', permission);
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        //刷新token
        RefeshToken({ commit }) {
            return new Promise((resolve, reject) => {
                RefeshToken().then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    setToken(data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        //获取所有系统
        getAllSystem({ commit }) {
            return new Promise(resolve => {
                getAllSystem().then((res) => {
                    const data = res.data;
                    resolve(data);
                })
            })
        },

        userAdd({ commit },params){
            params.roleIds=params.roleNames.join(';');

            delete params.roleNames;

            return  AddUser(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "添加成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            }).catch(() => {})
        },

        //获取用户表格数据
        GetUserList({ commit },params){
            return  GetAllUsers(params).catch(() => {})
        }

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },

        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}
export default user
