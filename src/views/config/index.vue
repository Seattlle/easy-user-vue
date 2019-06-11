<template>
    <basic-container>
        <!--:total="total"-->
        <!--:data="data"-->
        <!--@getData="getData"-->

        <table-page
                :menu="menu"
                :column="column"
                :where="where"
                :add-column="addColumn"
                vuex-method="GetConfigList"


                @delConfig="delConfig"
        ></table-page>
    </basic-container>
</template>

<script>
    import TablePage from '@/components/table'

    export default {
        name: 'config',
        components: {
            TablePage
        },
        data() {
            return {
                total:0,
                data:[],
                //条件
                where:{orderBy:'sortNo'},
                //表格列
                column: [
                    {
                        label: '参数ID',
                        prop: 'configId',
                        rules: [{
                            required: true,
                            message: "请输入参数ID",
                            trigger: "blur"
                        }],
                        search: true
                    },
                    {
                        label: '参数名称',
                        prop: 'configName',
                        rules: [{
                            required: true,
                            message: "请输入参数名称",
                            trigger: "blur"
                        }]
                    },{
                        label: '参数值',
                        prop: 'configValue',
                        rules: [{
                            required: true,
                            message: "请输入参数值",
                            trigger: "blur"
                        }]
                    }, {
                        label: "排序",
                        prop: "sortNo"
                    }, {
                        label: "备注",
                        prop: "remark"
                    }
                ],
                //表格按钮
                menu: [
                    // {
                    //     name: '新增',
                    //     jsMethodName: 'addConfig',
                    //     isDialog: true
                    // }, {
                    //     name: '修改',
                    //     jsMethodName: 'editConfig',
                    //     selectDataNum: 1,
                    //     isDialog: true
                    // }, {
                    //     name: '删除',
                    //     jsMethodName: 'delConfig',
                    //     selectDataNum: 2,
                    //     css: 'danger'
                    // }
                ],
                //编辑额外字段
                addColumn: [],
            }
        },
        computed: {},
        methods: {
            delConfig(params) {
                this.$confirm(`是否删除该配置？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let ids = [];
                    for (let i in params.selected) {
                        ids.push(params.selected[i].configId);
                    }

                    this.$store.dispatch('DelConfig', ids.join(';')).then((flag) => {
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
