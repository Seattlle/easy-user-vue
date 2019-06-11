<template>
    <basic-container>
        <table-page
                :menu="menu"
                :column="column"
                :add-column="addColumn"
                vuex-method="GetUserList"

                @resetPwd="showPwdDialog"
                @userEnable="userEnable"
                @userDisable="userDisable"
                @setRole="setRole"
        ></table-page>


        <el-dialog :title="title" :visible.sync="showDialog" :before-close="cancel">
            <avue-form ref="dialogForm" v-model="obj" :option="dialogOption"></avue-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button @click="sure" type="primary">确定</el-button>
            </div>
        </el-dialog>
    </basic-container>
</template>

<script>
    import { mapGetters } from "vuex";
    import TablePage from '@/components/table'

    import {ModifyState, ResetPwd, SetRole} from "@/api/user";

    export default {
        name: 'user',
        components: {
            TablePage
        },
        data() {
            return {
                //表格按钮
                menu: [
                    // {
                    //     name: '新增',
                    //     jsMethodName: 'userAdd',
                    //     isDialog: true
                    // }, {
                    //     name: '重置密码',
                    //     jsMethodName: 'resetPwd',
                    //     selectDataNum: 1
                    // }, {
                    //     name: '启用',
                    //     jsMethodName: 'userEnable',
                    //     selectDataNum: 2
                    // }, {
                    //     name: '禁用',
                    //     jsMethodName: 'userDisable',
                    //     selectDataNum: 2,
                    //     css: 'danger'
                    // }, {
                    //     name: '设置角色',
                    //     jsMethodName: 'setRole',
                    //     selectDataNum: 1
                    // }
                ],
                //编辑额外字段
                addColumn: [],

                title: '',
                obj: {},
                showDialog: false,
                dialogOption: {
                    menuBtn: false,
                    column: []
                },
                EditData: {}
            }
        },
        computed: {
            ...mapGetters(["website"]),
            //表格列
            column(){
                return [
                    {
                        label: '登陆账号',
                        prop: 'loginName',
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请输入账号",
                            trigger: "blur"
                        }],
                        search: true
                    },
                    {
                        label: '密码',
                        prop: 'loginPwd',
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请输入密码",
                            trigger: "blur",
                        }],
                        hide: true
                    },
                    {
                        label: '所属角色',
                        prop: 'strRoleIds',
                        type: 'checkbox',
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请选择所属角色",
                            trigger: "blur",
                        }],
                        props: {
                            label: 'name',
                            value: 'roleId'
                        },
                        dicUrl: this.website.RequestHeaders.user+'/sys/role/findMyRoles',
                        hide:true,
                    },
                    {
                        label: '所属角色',
                        prop: 'roleNames',
                        editDisplay:true
                    },
                    {
                        label: "状态",
                        prop: "state",
                        dicData: [
                            {
                                label: '正常',
                                value: 1
                            }, {
                                label: '禁用',
                                value: 0
                            }
                        ],
                        editDisplay: true
                    }
                ]
            }
        },
        methods: {
            userEnable(params) {
                let ids = [], selected = params.selected;

                for (let i in selected) {
                    ids.push(selected[i].userId);
                }

                ModifyState(ids.join(';'), 1).then(res => {
                    if (res.resultCode === 200) {
                        this.$message({
                            showClose: true,
                            message: "修改成功！",
                            type: "success"
                        })
                    }
                    params.table.refreshChange();
                })
            },
            userDisable(params) {
                let ids = [], selected = params.selected;

                for (let i in selected) {
                    ids.push(selected[i].userId);
                }

                ModifyState(ids.join(';'), 0).then(res => {
                    if (res.resultCode === 200) {
                        this.$message({
                            showClose: true,
                            message: "修改成功！",
                            type: "success"
                        })
                    }
                    params.table.refreshChange();
                })
            },

            showPwdDialog(params) {
                this.title = '重置密码';
                this.showDialog = true;

                let validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.obj.loginPwd) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                };
                this.dialogOption.column = [
                    {
                        label: "新密码",
                        prop: "loginPwd",
                        type: "password",
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请输入新密码",
                            trigger: "blur"
                        }]
                    }, {
                        label: "确认密码",
                        prop: "loginPwd2",
                        span: 24,
                        type: "password",
                        rules: [{
                            validator: validatePass2,
                            trigger: 'blur'
                        }]
                    }
                ]

                this.EditData = params;
            },

            resetPwd() {
                ResetPwd(this.obj).then(res => {
                    if (res.resultCode === 200) {
                        this.$message({
                            showClose: true,
                            message: "修改成功！",
                            type: "success"
                        })
                    }
                    this.EditData.table.refreshChange();
                    this.showDialog = false;
                }).catch(() => {
                })
            },
            cancel() {
                this.obj = {};
                this.$refs.dialogForm.resetForm();
                this.showDialog = false;
            },
            sure() {
                this.$refs.dialogForm.validate(valid => {
                    if (valid) {
                        this.obj.userId = this.EditData.selected[0].userId;
                        if (this.title === '设置角色') {
                            this.saveSetRole();
                        } else {
                            this.resetPwd();
                        }
                    }
                });
            },

            setRole(params) {
                this.title = '设置角色';
                this.showDialog = true;

                let item = params.selected[0];
                this.obj.loginName = item.loginName;
                this.obj.strRoleIds = item.strRoleIds ? item.strRoleIds.split(',') :[];

                this.dialogOption.column = [
                    {
                        label: '登陆账号',
                        prop: 'loginName',
                        span: 24,
                        disabled: true,
                    },
                    {
                        label: '所属角色',
                        prop: 'strRoleIds',
                        type: 'checkbox',
                        span: 24,
                        rules: [{
                            required: true,
                            message: "请选择所属角色",
                            trigger: "blur",
                        }],
                        props: {
                            label: 'name',
                            value: 'roleId'
                        },
                        dicUrl: this.website.RequestHeaders.user+'/sys/role/findMyRoles',
                    }
                ]
                this.EditData = params;
            },
            saveSetRole() {
                let user={
                    roleIds:this.obj.strRoleIds.join(';'),
                    userId:this.obj.userId
                }

                SetRole(user).then(res => {
                    if (res.resultCode === 200) {
                        this.$message({
                            showClose: true,
                            message: "设置成功！",
                            type: "success"
                        })
                    }
                    this.EditData.table.refreshChange();
                    this.showDialog = false;
                }).catch(() => {
                })

            }

        }
    }
</script>

<style scoped>
</style>
