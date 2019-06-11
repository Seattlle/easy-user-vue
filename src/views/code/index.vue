<template>
    <basic-container>
        <table-page
                :menu="menu"
                :where="where"
                :column="column"
                vuex-method="GetCodeList"

                @Setting="Setting"
                @DelCode="DelCode"
        ></table-page>

        <el-dialog title="参数设置" :visible.sync="showSetting">
            <avue-crud
                    ref="table"
                    v-model="obj"
                    :data="SettingData"
                    :table-loading="loading"
                    :option="SettingOption"
                    @refresh-change="onLoad"
                    @row-save="AddOption"
                    @row-update="EditOption"
                    @row-del="DelOption"
                    >
            </avue-crud>
        </el-dialog>

    </basic-container>
</template>

<script>
    import TablePage from '@/components/table'

    import {GetInfoById,ModifyInfo,DelInfo} from '@/api/code'

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
                        label: '类型',
                        prop: 'typeId',
                        span:24,
                        rules: [{
                            required: true,
                            message: "请输入类型",
                            trigger: "blur"
                        }],
                        search: true
                    },
                    {
                        label: '名称',
                        prop: 'typeName',
                        span:24,
                        rules: [{
                            required: true,
                            message: "请输入名称",
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
                    //     jsMethodName: 'addCode',
                    //     isDialog: true
                    // }, {
                    //     name: '修改',
                    //     jsMethodName: 'editCode',
                    //     selectDataNum: 1,
                    //     isDialog: true
                    // }, {
                    //     name: '删除',
                    //     jsMethodName: 'DelCode',
                    //     selectDataNum: 2,
                    //     css:'danger'
                    // }, {
                    //     name: '配置',
                    //     jsMethodName: 'Setting',
                    //     selectDataNum: 1
                    // }
                ],

                showSetting:false,
                loading:false,
                obj:{},
                SettingData:[],
                SettingOption:{
                    column: [
                        {
                            label: '值',
                            prop: 'infoValue',
                            span:24,
                            rules: [{
                                required: true,
                                message: "请输入值",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: '内容',
                            prop: 'infoContent',
                            span:24,
                            rules: [{
                                required: true,
                                message: "请输入内容",
                                trigger: "blur"
                            }]
                        },
                        {
                            label: "排序",
                            prop: "sortNo",
                            span:24,
                        }
                    ]
                },
                Selected:{}
            }
        },
        computed: {},
        methods: {
            DelCode(params) {
                this.$confirm(`是否删除？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let ids = [];
                    for (let i in params.selected) {
                        ids.push(params.selected[i].typeId);
                    }
                    this.$store.dispatch('delCode', ids.join(';')).then((flag) => {
                        flag && params.table.refreshChange();
                    })
                }).catch(() => {
                });
            },
            Setting(params){
                this.showSetting=true;
                this.Selected=params.selected[0];

                this.onLoad();
            },
            onLoad(){
                this.loading=true;

                GetInfoById(this.Selected.typeId).then(res=>{
                    this.SettingData=res.data.list;
                    this.loading=false;
                })
            },
            AddOption(row,done,loading){
                this.obj.typeId=this.Selected.typeId;

                ModifyInfo(this.obj).then(res=>{
                    if(res.resultCode===200){
                        this.$message({
                            showClose: true,
                            message: "添加成功",
                            type: "success"
                        });
                        this.onLoad();
                        done();
                    }else{
                        loading=false;
                    }
                })
            },
            EditOption(row,index,done,loading){
                this.obj.typeId=this.Selected.typeId;

                ModifyInfo(this.obj).then(res=>{
                    if(res.resultCode===200){
                        this.$message({
                            showClose: true,
                            message: "添加成功",
                            type: "success"
                        });
                        this.onLoad();
                        done();
                    }else{
                        loading=false;
                    }
                })
            },
            DelOption(row){
                this.$confirm(`是否删除？`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    DelInfo(row.infoId).then(res=>{
                        this.$message({
                            showClose: true,
                            message: res.resultMsg,
                            type: "success"
                        });
                        this.onLoad();
                    })
                }).catch(() => {});
            }
        }
    }
</script>

<style scoped>
</style>
