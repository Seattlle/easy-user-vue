import {ajax,headers} from '@/router/axios';

export const getUserData = (page) => ajax({
    url: '/admin/getUser',
    method: 'get',
    data: { page }
})

export const getRoleData = (page) => ajax({
    url: '/admin/getRole',
    method: 'get',
    data: { page }
})



export const getDic = (type) => ajax({
    url: '/admin/getDic',
    method: 'get',
    data: {
        type
    }
})

export const GetSystemMenu = (type) => ajax({
    url:headers.user+'/sys/menu/findAll',
    method: 'get',
    data: {
        belongSys:type
    }
})

export const AddSystemMenu = (params) => ajax({
    url: headers.user+'/sys/menu/add',
    method: 'post',
    data: params
})

export const ModifySystemMenu = (params) => ajax({
    url: headers.user+'/sys/menu/modify',
    method: 'post',
    data: params
})
export const DelSystemMenu = (id) => ajax({
    url: headers.user+'/sys/menu/deleteAll',
    method: 'post',
    data: {
        id:id
    }
})
