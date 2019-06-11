import {ajax,headers} from '@/router/axios';

export const GetSystemMenu = (type) => ajax({
    url: headers.user+'/sys/menu/findAll',
    method: 'post',
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

export const AddMenuBtn = (btn) => ajax({
    url: headers.user+'/sys/button/add',
    method: 'post',
    data: btn
})
export const ModifyMenuBtn = (btn) => ajax({
    url: headers.user+'/sys/button/modify',
    method: 'post',
    data: btn
})

export const DelMenuBtn = (bid) => ajax({
    url: headers.user+'/sys/button/delByIds',
    method: 'post',
    data: {
        ids:bid
    }
})
