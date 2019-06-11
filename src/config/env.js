// 配置编译环境和线上环境之间的切换

let baseUrl = '';
let iconfontVersion = ['567566_qo5lxgtishg'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${baseUrl}/code`

const env = process.env
if (env.NODE_ENV == 'development') {
    baseUrl = ``; // 开发环境地址
} else if (env.NODE_ENV == 'production') {
    baseUrl = ``; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = ``; //测试环境地址
}

let ICON = [
    'el-icon-upload',
    'el-icon-error',
    'el-icon-success',
    'el-icon-warning',
    'el-icon-sort-down',
    'el-icon-sort-up',
    'el-icon-arrow-left',
    'el-icon-circle-plus',
    'el-icon-circle-plus-outline',
    'el-icon-arrow-down',
    'el-icon-arrow-right',
    'el-icon-arrow-up',
    'el-icon-back',
    'el-icon-circle-close',
    'el-icon-date',
    'el-icon-circle-close-outline',
    'el-icon-caret-left',
    'el-icon-caret-bottom',
    'el-icon-caret-top',
    'el-icon-caret-right',
    'el-icon-close',
    'el-icon-d-arrow-left',
    'el-icon-check',
    'el-icon-delete',
    'el-icon-d-arrow-right',
    'el-icon-document',
    'el-icon-d-caret',
    'el-icon-edit-outline',
    'el-icon-download',
    'el-icon-goods',
    'el-icon-search',
    'el-icon-info',
    'el-icon-message',
    'el-icon-edit',
    'el-icon-location',
    'el-icon-loading',
    'el-icon-location-outline',
    'el-icon-menu',
    'el-icon-minus',
    'el-icon-bell',
    'el-icon-mobile-phone',
    'el-icon-news',
    'el-icon-more',
    'el-icon-more-outline',
    'el-icon-phone',
    'el-icon-phone-outline',
    'el-icon-picture',
    'el-icon-picture-outline',
    'el-icon-plus',
    'el-icon-printer',
    'el-icon-rank',
    'el-icon-refresh',
    'el-icon-question',
    'el-icon-remove',
    'el-icon-share',
    'el-icon-star-on',
    'el-icon-setting',
    'el-icon-circle-check',
    'el-icon-service',
    'el-icon-sold-out',
    'el-icon-remove-outline',
    'el-icon-star-off',
    'el-icon-circle-check-outline',
    'el-icon-tickets',
    'el-icon-sort',
    'el-icon-zoom-in',
    'el-icon-time',
    'el-icon-view',
    'el-icon-upload2',
    'el-icon-zoom-out'
];

let IconList = [{
    label: '基本图标',
    list: ICON
}, {
    label: '扩展图标',
    list: [
        'iconfont icon-daohanglanmoshi02',
        'iconfont icon-changyonglogo27',
        'iconfont icon-bug',
        'iconfont icon-qq1',
        'iconfont icon-weixin1',
        'iconfont icon-biaoge',
        'iconfont icon-baidu1',
        'iconfont icon-tubiao',
        'iconfont icon-souhu',
        'iconfont icon-msnui-360',
        'iconfont icon-huanyingye',
        'iconfont icon-weixin',
        'iconfont icon-qq',
        'iconfont icon-tuichu',
        'iconfont icon-yonghuguanli',
        'iconfont icon-caidanguanli'
    ]
}]

export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    ICON,
    IconList,
    env
}
