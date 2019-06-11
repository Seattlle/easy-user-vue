import {ajax,headers} from '@/router/axios';

export const GetAllSystem = (params) => ajax({
    url: headers.user+'/sys/webSys/findList',
    method: 'post',
    data:params
})
export const GetAllLogs = (params) => ajax({
    url: headers.user+'/sys/log/findList',
    method: 'post',
    data:params
})

export const AddSystem = (params) => ajax({
    url: headers.user+'/sys/webSys/add',
    method: 'post',
    data:params
})
export const EditSystem= (params) => ajax({
    url: headers.user+'/sys/webSys/modify',
    method: 'post',
    data:params
})
export const DelSystem = (ids) => ajax({
    url: headers.user+'/sys/webSys/delByIds',
    method: 'post',
    data:{
        ids:ids
    }
})
