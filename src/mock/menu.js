import Mock from 'mockjs'

/**
 *
 * 动态模拟菜单
 *
 * label菜单的名字
 * path菜单的路径
 * icon菜单的图标（系统采用的阿里巴巴图表库）
 * compnent组件的地址
 * children子类菜单数组
 * group配置其他路由激活菜单高亮
 */
const menu = [{
    menuId: 1,
    label: "菜单管理",
    path: '/menu',
    component: 'views/menu/index',
    icon: 'icon-canshu',
    children: [],
    meta: {
        $keepAlive: true
    },
}, {
    menuId: 2,
    label: "权限管理",
    path: '/role',
    icon: 'icon-quanxian',
    component: 'views/role/index',
    children: [],
    meta: {
        $keepAlive: true
    },
}, {
    menuId: 3,
    label: "角色管理",
    path: '/character',
    icon: 'icon-shujuzhanshi2',
    component: 'views/character/index',
    children: [],
    meta: {
        $keepAlive: true
    },
}, {
    menuId: 4,
    label: "用户管理",
    path: '/user',
    icon: 'icon-changyonglogo27',
    component: 'views/user/index',
    meta: {
        $keepAlive: true
    },
    children: []
}, {
    menuId: 5,
    label: "参数配置",
    path: '/config',
    icon: 'icon-iframe',
    component: 'views/config/index',
    meta: {
        $keepAlive: true
    },
    children: []
}, {
    menuId: 6,
    label: "系统表",
    path: '/system',
    icon: 'icon-biaodan',
    component: 'views/system/index',
    meta: {
        $keepAlive: true
    },
    children: []
}, {
    menuId: 7,
    label: "代码管理",
    path: '/code',
    icon: 'icon-biaoge',
    component: 'views/code/index',
    meta: {
        $keepAlive: true
    },
    children: []
}, {
    menuId: 8,
    label: "日志管理",
    path: '/logs',
    component: 'views/logs/index',
    icon: 'icon-biaodan',
    meta: {
        $keepAlive: true
    },
    children: []
}]
export default ({ mock }) => {
    if (!mock) return;
    Mock.mock('/user/sys/role/findMyMenus', 'post', (res) => {
        // let body = JSON.parse(res.body);
        return {
            data: menu
        }
    })
}
