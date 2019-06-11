import {ajax,headers} from '@/router/axios';

// 根据菜单id查找按钮
export const GetMenuById = (mid) => ajax({
    url: headers.user+'/sys/button/findList',
    method: 'post',
    data:{
        menuId:mid,
        orderBy:'sortNo'
    }
})

