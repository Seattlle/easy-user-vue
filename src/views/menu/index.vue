<template>
    <div>
        <basic-container>
            <el-container>
                <el-aside width="350px">
                    <div class="left">
                        <el-select v-model="ChosedSystem"
                                   @change="changeSystem"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in system"
                                    :key="item.sortNo"
                                    :label="item.sysName"
                                    :value="item.sysCode">
                            </el-option>
                        </el-select>

                        <el-tree :data="menu"
                                 node-key="menuId"
                                 highlight-current
                                 default-expand-all
                                 :expand-on-click-node="false"
                                 @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </el-aside>
                <el-container>
                    <el-header class="menu-header">
                        <el-button-group>
                            <el-button type="primary"
                                       icon="el-icon-plus"
                                       size="small"
                                       @click.native="handleAdd">新增
                            </el-button>
                            <el-button type="danger"
                                       icon="el-icon-delete"
                                       size="small"
                                       @click.native="handleDel">删除
                            </el-button>
                        </el-button-group>
                    </el-header>
                    <el-main>
                        <avue-form ref="menuForm" v-model="form" :option="option" @submit="handleSubmit"></avue-form>

                        <avue-crud :data="menuBtn"
                                   v-model="btn"
                                   :option="btnOption"
                                   @row-save="addBtn"
                                   @row-update="editBtn"
                                   @row-del="delBtn"
                        ></avue-crud>
                    </el-main>
                </el-container>
            </el-container>
        </basic-container>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {validatenull} from "@/util/validate";
    import {findParent} from "@/util/util";
    import {IconList} from '@/config/env'

    import {
        GetSystemMenu,
        AddSystemMenu,
        ModifySystemMenu,
        DelSystemMenu,
        AddMenuBtn,
        DelMenuBtn,
        ModifyMenuBtn
    } from "@/api/menu";

    export default {
        name: "menu",
        data() {
            return {
                form: {
                    pid: '',
                    label: '',
                    icon: '',
                    path: '',
                    meta: '',
                    component: '',
                    sortNo:0
                },
                parentForm: {},
                formGrade: false,
                formStatus: "",

                btn: {},
                menuBtn: [],
                changeButton: false,

                dialogIconVisible: false,
                menu: [],
                system: [],
                ChosedSystem: '',
            };
        },
        created() {
            this.$store.dispatch("getAllSystem").then((data) => {
                this.system = data;
            });
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.menuForm.clearValidate();
            });
        },
        computed: {
            option() {
                return {
                    column: [
                        {
                            label: '父节点',
                            prop: 'pid',
                            type: 'tree',
                            span: 24,
                            dicData: this.menu,
                            rules: [{
                                message: "请选择父节点",
                                trigger: "change"
                            }],
                            props: {
                                value: 'menuId'
                            }
                        }, {
                            label: "菜单名称",
                            prop: "label",
                            span: 24,
                            rules: [{
                                required: true,
                                message: "请输入菜单名称",
                                trigger: "change"
                            }]
                        }, {
                            label: "菜单图标",
                            prop: "icon",
                            span: 24,
                            type: 'icon-select',
                            iconList: IconList
                        }, {
                            label: "菜单路径",
                            prop: "path",
                            span: 24,
                            rules: [{
                                required: true,
                                message: "请输入菜单路径",
                                trigger: "change"
                            }]
                        }, {
                            label: "模板路径",
                            prop: "component",
                            span: 24,
                            rules: [{
                                message: "请输入菜单模板",
                                trigger: "change"
                            }]
                        }, {
                            label: "菜单信息",
                            prop: "meta",
                            span: 24,
                            rules: []
                        }, {
                            label: "排序",
                            prop: "sortNo",
                            span: 24
                        }
                    ]
                }
            },
            //菜单按钮配置
            btnOption() {
                return {
                    page: false,
                    align: 'center',
                    menuAlign: 'center',
                    menuWidth: 130,
                    refreshBtn: false,
                    // defaultSort:{prop:'sortNo',order:'asc'},
                    column: [
                        {
                            label: '按钮名称',
                            prop: 'name',
                            rules: [{
                                required: true,
                                message: "请输入按钮名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: '前端方法',
                            prop: 'jsMethodName',
                            rules: [{
                                required: true,
                                message: "请输入前端方法名称",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: '后台类名',
                            prop: 'className'
                        },
                        {
                            label: '后台方法',
                            prop: 'methodName'
                        },
                        {
                            label: '限定数量',
                            prop: 'selectDataNum',
                            type: 'select',
                            valueDefault: 0,
                            dicData: [{
                                value: 0,
                                label: '无限制'
                            }, {
                                value: 1,
                                label: '单条'
                            }, {
                                value: 2,
                                label: '多条'
                            }]
                        },
                        {
                            label: '是否编辑',
                            prop: 'isDialog',
                            type: 'select',
                            dicData: [{
                                value: 1,
                                label: '是'
                            },{
                                value: 0,
                                label: '否'
                            }]
                        },
                        {
                            label: '图标',
                            prop: 'buttonIcon',
                            type: 'icon-select',
                            iconList: IconList
                        },
                        {
                            label: '按钮样式',
                            prop: 'css'
                        },
                        {
                            label: '排序',
                            prop: 'sortNo',
                            type: 'number'
                        }
                    ]
                }
            },
        },
        props: [],
        methods: {
            handleNodeClick(data) {
                this.form = data;

                this.menuBtn =data.buttons;
            },
            handleAdd() {
                this.formStatus = "add";
                this.clearBtnInfo();
            },
            handleDel() {
                if (this.form.menuId) {
                    this.$confirm(`是否确认删除${this.form.label}`, "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {

                            DelSystemMenu(this.form.menuId).then(() => {
                                this.changeSystem(this.ChosedSystem);
                                this.$message({
                                    showClose: true,
                                    message: "删除成功",
                                    type: "success"
                                })
                            })

                        })
                        .catch(() => {
                        });
                } else {
                    this.$message({
                        message: "请选择菜单！",
                        type: "warning"
                    });
                }

            },
            handleSubmit() {
                if (!this.ChosedSystem) {
                    this.$message({
                        message: '请选择所属系统',
                        type: 'error'
                    })
                    return;
                }

                delete this.form.buttons;
                delete this.form.children;
                delete this.form.$pid;

                this.form.belongSys = this.ChosedSystem;
                if (this.form.menuId) {
                    ModifySystemMenu(this.form).then(res => {
                        this.changeSystem(this.ChosedSystem);
                        this.$message({
                            message: res.resultMsg,
                            type: res.resultCode === 200 ? 'success' : 'error',
                            onClose: () => {

                            }
                        })
                    });
                } else {
                    AddSystemMenu(this.form).then(res => {
                        this.changeSystem(this.ChosedSystem);
                        this.$message({
                            message: res.resultMsg,
                            type: res.resultCode === 200 ? 'success' : 'error'
                        })
                    });
                }

            },
            changeSystem(value) {
                this.clearBtnInfo();
                GetSystemMenu(value).then(res => {
                    this.menu = res.data;
                })
            },

            addBtn(row, done) {
                let mid = this.form.menuId;
                if (mid) {
                    row.menuId = mid;
                    AddMenuBtn(row).then(res => {
                        if (res.resultCode === 200) {
                            this.menuBtn.push(res.data);
                        }
                    })
                } else {
                    this.$message({
                        message: "请选择菜单！",
                        type: "warning"
                    });
                }
                done();
            },

            editBtn(row, index, done) {
                let mid = this.form.menuId;
                if (mid) {
                    delete row.$index;
                    delete row.$isDialog;
                    delete row.$selectDataNum;

                    row.menuId = mid;
                    ModifyMenuBtn(row).then(res => {
                        if (res.resultCode === 200) {
                            Vue.set(this.menuBtn,index,row);

                            this.$message({
                                message: "修改成功！",
                                type: "success"
                            });
                        }
                    })
                } else {
                    this.$message({
                        message: "请选择菜单！",
                        type: "warning"
                    });
                }
                done();
            },
            delBtn(row, index) {
                this.$confirm(`是否确认删除该按钮`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        DelMenuBtn(row.buttonId).then(res => {
                            if (res.resultCode === 200) {
                                console.log(index);
                                this.menuBtn.splice(index, 1);
                            }
                        });
                    })
                    .catch(() => {
                    });
            },
            clearBtnInfo() {
                this.btn = {};
                this.menuBtn = [];
                this.$refs.menuForm.resetForm();
            },

            ChoseItem(icon) {
                if (this.changeButton) {
                    this.btn.buttonIcon = icon;
                } else {
                    this.form.icon = icon;
                }
                this.changeButton = false;
                this.dialogIconVisible = false;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .menu-container {
        padding: 0 20px;
    }

    .menu-header {
        padding: 8px 0;
    }

    .left {
        width: 300px;

        .el-tree {
            margin-top: 15px;
        }
    }


</style>
