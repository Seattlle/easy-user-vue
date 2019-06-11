import {ajax,headers} from '@/router/axios';

export const GetAllCode = (params) => ajax({
    url: headers.user+'/sys/codeType/findList',
    method: 'post',
    data:params
})

export const AddCode = (params) => ajax({
    url: headers.user+'/sys/codeType/add',
    method: 'post',
    data:params
})
export const EditCode= (params) => ajax({
    url: headers.user+'/sys/codeType/modify',
    method: 'post',
    data:params
})
export const GetInfoById = (ids) => ajax({
    url: headers.user+'/sys/codeInfo/findList',
    method: 'post',
    data:{
        page: 1,
        rows: 100,
        typeId:ids,
        orderBy:'sortNo'
    }
})
export const ModifyInfo = (params) => ajax({
    url: headers.user+'/sys/codeInfo/addOrModify',
    method: 'post',
    data:params
})
export const DelInfo = (ids) => ajax({
    url: headers.user+'/sys/codeInfo/delByIds',
    method: 'post',
    data:{
        ids:ids,
    }
})
