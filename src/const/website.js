/**
 * 全局配置文件
 */
export default {
    title: "权限系统",
    logo: "E",
    indexTitle: 'Easy-权限系统',
    lockPage: '/lock',
    tokenTime: 6000,
    info: {
        title: "后台管理系统",
        list: [
            '后台管理系统'
        ]
    },
    //http的status默认放行不才用统一处理的,
    statusWhiteList: [400],
    //配置首页不可关闭
    isFirstPage: false,
    fistPage: {
        label: "首页",
        value: "/wel/index",
        params: {},
        query: {},
        group: [],
        close: false
    },
    //配置菜单的属性
    menu: {
        props: {
            label: 'label',
            path: 'path',
            icon: 'icon',
            children: 'children'
        }
    },
    request:{
        ajaxPath:'http://192.168.1.6:8501',
        statusName:'resultCode',
        msgName:'resultMsg',
        resultName:'data'
    },
    RequestHeaders:{
        user:'http://192.168.1.6:8501/user'
    },
    key:'sysUser',
    useMock:false
}
