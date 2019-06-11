import {ajax,headers} from '@/router/axios';

export const GetAllRoles = (params) => ajax({
    url: headers.user+'/sys/role/findList',
    method: 'post',
    data:params
})

export const GetRolesMenu = (role,sys) => ajax({
    url: headers.user+'/sys/role/findAllByRoleId',
    method: 'post',
    data:{
        roleId:role,
        belongSys:sys,
    }
})

export const SaveSetting = (params) => ajax({
    url: headers.user+'/sys/role/saveRMB',
    method: 'post',
    data:params
})

export const GetMyRoles = () => ajax({
    url: headers.user+'/sys/role/findMyRoles',
    method: 'get',
    data:{}
})

export const AddRole = (params) => ajax({
    url: headers.user+'/sys/role/save',
    method: 'post',
    data:params
})

export const EditRole = (params) => ajax({
    url: headers.user+'/sys/role/modify',
    method: 'post',
    data:params
})

export const DelRole = (id) => ajax({
    url: headers.user+'/sys/role/delByIds',
    method: 'post',
    data:{
        ids:id
    }
})

