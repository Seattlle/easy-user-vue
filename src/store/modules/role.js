import website from '@/const/website'
import {Message} from "element-ui";

import {GetAllRoles,AddRole, EditRole, DelRole} from "@/api/role";
import {GetConfig,AddConfig, EditConfig,DelConfig} from "@/api/config";
import {GetAllSystem,AddSystem, EditSystem,DelSystem,GetAllLogs} from "@/api/system";

import {GetAllCode,AddCode, EditCode,DelCode} from "@/api/code";

const role = {
    state: {
        website: website,
        activeMenu:{}
    },
    actions: {
        //角色
        GetRoleList({commit},params){
            return  GetAllRoles(params).catch(() => {})
        },
        addRole({commit},params){
          return  AddRole(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "添加成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            }).catch(() => {})
        },
        editRole({commit},params){
            return  EditRole(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "修改成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },
        delRole({commit},roleId){
            return DelRole(roleId).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "删除成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },

        //配置
        GetConfigList({commit},params){
            return  GetConfig(params).catch(() => {})
        },
        addConfig({commit},params){
            return  AddConfig(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "添加成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            }).catch(() => {})
        },
        editConfig({commit},params){
            return  EditConfig(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "修改成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },
        DelConfig({commit},ids){
            return  DelConfig(ids).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "删除成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },

        //系统表
        GetSystemList({commit},params){
            return  GetAllSystem(params).catch(() => {})
        },
        AddSystem({commit},params){
            return  AddSystem(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "添加成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            }).catch(() => {})
        },
        EditSystem({commit},params){
            return  EditSystem(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "修改成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },
        DelSystem({commit},ids){
            return  DelSystem(ids).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "删除成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },

        //系统表
        GetLogList({commit},params){
            return  GetAllLogs(params).catch(() => {})
        },

        //代码表
        GetCodeList({commit},params){
            return  GetAllCode(params).catch(() => {})
        },
        addCode({commit},params){
            return  AddRole(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "添加成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            }).catch(() => {})
        },
        editCode({commit},params){
            return  EditRole(params).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "修改成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },
        delCode({commit},roleId){
            return DelRole(roleId).then(res => {
                if (res.resultCode === 200) {
                    Message({
                        message: "删除成功！",
                        type: "success"
                    });
                    return true;
                } else {
                    return false;
                }
            })
        },

    },
    mutations: {

    }
}

export default role
