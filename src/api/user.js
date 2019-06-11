import {ajax,headers} from '@/router/axios';

export const loginByUsername = (params) => ajax({
    url: headers.user+'/sys/user/login',
    method: 'post',
    data: params
})

export const getUserInfo = () => ajax({
    url: headers.user+'/sys/user/info',
    method: 'get'
});

export const RefeshToken = () => ajax({
    url: '/user/refesh',
    method: 'post'
})

export const getMenu = (type) => ajax({
    url: headers.user+'/sys/role/findMyMenus',
    method: 'post',
    data: {
        sysCode: type
    }
});

export const getMenuAll = () => ajax({
    url: '/user/getMenu',
    method: 'get',
    data: {
        type: 0
    }
});

export const getTableData = (page) => ajax({
    url: '/user/getTable',
    method: 'get',
    data: {
        page
    }
});

export const getAllSystem = () => ajax({
    url: headers.user+'/sys/webSys/findList',
    method: 'get',
    data: {
        page:1,
        rows:100
    }
});

export const logout = () => ajax({
    url: '/user/logout',
    method: 'get'
})

export const GetAllUsers = (params) => ajax({
    url: headers.user+'/sys/user/findUserList',
    method: 'post',
    data: params
});
export const AddUser = (params) => ajax({
    url: headers.user+'/sys/user/createAndRole',
    method: 'post',
    data: params
});
export const ResetPwd = (params) => ajax({
    url: headers.user+'/sys/user/resetPwd',
    method: 'post',
    data: params
});
export const ModifyState = (ids,state) => ajax({
    url: headers.user+'/sys/user/modifyState',
    method: 'post',
    data: {
        ids:ids,
        state:state
    }
});

export const SetRole = (params) => ajax({
    url: headers.user+'/sys/userRole/saveUserRole',
    method: 'post',
    data:params
})
