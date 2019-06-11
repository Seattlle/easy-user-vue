<template>
    <basic-container>
        <table-page
                :menu="menu"
                :where="where"
                :column="column"
                :add-column="addColumn"
                :url="website.RequestHeaders.user+'/sys/role/findList'"

                @delRole="delRole"
        ></table-page>
    </basic-container>
</template>

<script>
    import { mapGetters } from "vuex";
    import TablePage from '@/components/table'

    export default {
        name: 'character',
        components: {
            TablePage
        },
        computed:{
            ...mapGetters(['website'])
        },
        data() {
            return {
                //表格列
                column: [
                    {
                        label: '角色id',
                        prop: 'roleId',
                        rules: [{
                            required: true,
                            message: "请输入角色id",
                            trigger: "blur"
                        }],
                        search: true
                    },
                    {
                        label: '角色名称',
                        prop: 'name',
                        rules: [{
                            required: true,
                            message: "请输入角色名称",
                            trigger: "blur",
                            search: true
                        }]
                    }, {
                        label: "排序",
                        prop: "sortNo",
                        rules: [{
                            required: true,
                            message: "请输入排序",
                            trigger: "blur"
                        }]
                    }, {
                        label: "备注",
                        prop: "remark"
                    }
                ],
                //条件
                where:{orderBy:'sortNo'},
                //表格按钮
                menu: [
                    // {
                    //     name: '新增',
                    //     jsMethodName: 'addRole',
                    //     buttonIcon:'el-icon-plus',
                    //     isDialog: true
                    // }, {
                    //     name: '修改',
                    //     jsMethodName: 'editRole',
                    //     selectDataNum: 1,
                    //     isDialog: true
                    // }, {
                    //     name: '删除',
                    //     jsMethodName: 'delRole',
                    //     selectDataNum: 2,
                    //     css: 'danger'
                    // }
                ],
                //编辑额外字段
                addColumn: [],
            }
        },
        methods: {
            delRole(params) {
                this.$confirm(`是否删除该角色？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let ids = [];
                    for (let i in params.selected) {
                        ids.push(params.selected[i].roleId);
                    }

                    this.$store.dispatch('delRole', ids.join(';')).then((flag) => {
                        flag && params.table.refreshChange();
                    })
                }).catch(() => {
                });
            }
        }
    }
</script>

<style scoped>
</style>
