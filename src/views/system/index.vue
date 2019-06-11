<template>
    <basic-container>
        <table-page
                :menu="menu"
                :where="where"
                :column="column"
                vuex-method="GetSystemList"

                @DelSystem="DelSystem"
        ></table-page>

    </basic-container>
</template>

<script>
    import TablePage from '@/components/table'

    export default {
        name: 'user',
        components: {
            TablePage
        },
        data() {
            return {
                //表格列
                column: [
                    {
                        label: '系统编码',
                        prop: 'sysCode',
                        span:24,
                        rules: [{
                            required: true,
                            message: "请输入系统编码",
                            trigger: "blur"
                        }],
                        search: true
                    },
                    {
                        label: '系统名称',
                        prop: 'sysName',
                        span:24,
                        rules: [{
                            required: true,
                            message: "请输入系统名称",
                            trigger: "blur"
                        }]
                    },
                    {
                        label: '系统地址',
                        prop: 'sysUrl',
                        span:24,
                        rules: [{
                            required: true,
                            message: "请输入系统地址",
                            trigger: "blur"
                        }]
                    },
                    {
                        label: "排序",
                        prop: "sortNo",
                        span:24,
                    },
                    {
                        label: "备注",
                        prop: "remark",
                        span:24,
                    }
                ],
                //条件
                where:{orderBy:'sortNo'},
                //表格按钮
                menu: [
                    // {
                    //     name: '新增',
                    //     jsMethodName: 'AddSystem',
                    //     isDialog: true
                    // }, {
                    //     name: '修改',
                    //     jsMethodName: 'EditSystem',
                    //     selectDataNum: 1,
                    //     isDialog: true
                    // }, {
                    //     name: '删除',
                    //     jsMethodName: 'DelSystem',
                    //     selectDataNum: 2,
                    //     css:'danger'
                    // }
                ],
                //编辑额外字段
                addColumn: [],
            }
        },
        computed: {},
        methods: {
            DelSystem(params) {
                this.$confirm(`是否删除系统配置？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let ids = [];
                    for (let i in params.selected) {
                        ids.push(params.selected[i].sysCode);
                    }

                    this.$store.dispatch('DelSystem', ids.join(';')).then((flag) => {
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
