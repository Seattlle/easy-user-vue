import {ajax,headers} from '@/router/axios';

export const GetConfig = (params) => ajax({
    url: headers.user+'/sys/config/findList',
    method: 'post',
    data:params
})

export const AddConfig = (params) => ajax({
    url: headers.user+'/sys/config/add',
    method: 'post',
    data:params
})
export const EditConfig = (params) => ajax({
    url: headers.user+'/sys/config/modify',
    method: 'post',
    data:params
})
export const DelConfig = (ids) => ajax({
    url: headers.user+'/sys/config/delByIds',
    method: 'post',
    data:{
        ids:ids
    }
})
