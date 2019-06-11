<template>
    <basic-container>
        <table-page
                :menu="menu"
                :where="where"
                :column="column"
                vuex-method="GetLogList"

                @ContentDetail="ContentDetail"
        ></table-page>

        <el-dialog title="异常详情" :visible.sync="show">
            <div class="content" v-html="error"></div>
        </el-dialog>
    </basic-container>
</template>

<script>
    import TablePage from '@/components/table'

    export default {
        name: 'logs',
        components: {
            TablePage
        },
        data() {
            return {
                menu:[],
                where:{orderBy:'startTime desc'},
                column: [
                    {
                        label: '时间',
                        prop: 'startTime',
                        search: true,
                        type:'daterange',
                        format:'yyyy-MM-dd hh:mm:ss',
                        valueFormat: "yyyy-MM-dd"
                    },
                    {
                        label: '请求地址',
                        prop: 'action',
                    },
                    {
                        label: '请求IP',
                        prop: 'ip',
                    },
                    {
                        label: '所属系统',
                        prop: 'webSys',
                        search: true,
                    },
                    {
                        label: '执行时间（ms）',
                        prop: 'duration'
                    },
                    {
                        label: "状态",
                        prop: "status",
                        type:'select',
                        search: true,
                        dicData:[{
                            value:1,
                            label:'异常'
                        },{
                            value:0,
                            label:'正常'
                        }],
                        searchDefault:1
                    }
                ],

                show:false,
                error:''
            }
        },
        computed: {},
        methods: {
            ContentDetail(params){
                let item=params.selected[0];
                if(item.content){
                    this.error=item.content;
                    this.show=true;
                }else{
                    this.$message({
                        showClose: true,
                        message: "该数据为正常状态！",
                        type: "error"
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .content{
        width:100%;
        overflow-x: auto;
    }
</style>
