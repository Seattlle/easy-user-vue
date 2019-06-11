<template>
    <basic-container>
        <avue-crud
                ref="table"
                :data="TableData"
                :page="page"
                :option="tableOption"
                :table-loading="loading"

                @on-load="onLoad"
                @refresh-change="refreshChange"
                @selection-change="selectionChange"
                @search-change="SearchChange"
                @row-click="RowClick"

                @size-change="sizeChange"
                @current-change="currentChange">
            <!--表格按钮-->
            <template slot="menuLeft" v-if="menu && TableMenu.length>0">
                <el-button
                        size="small"
                        v-for="(item,index) in TableMenu"
                        :key="index"
                        :type="item.css || 'primary'"
                         :icon="item.buttonIcon"
                        @click="handler(item)"
                >{{item.name}}</el-button>
            </template>

        </avue-crud>


        <!--弹窗-->
        <form-dialog
                :show="dialogFormVisible"
                :option="dialogOption"
                :selected="EditObject"
                :current-method="CurrentEvent"
                @hideDialog="hideDialog">
        </form-dialog>

    </basic-container>
</template>

<script>

    import {ajax,headers} from '@/router/axios';

    import {mapGetters} from 'vuex'
    import {GetMenuById} from '@/api/common'

    import FormDialog from '@/components/dialog'

    export default {
        name: 'table',
        components: {
            FormDialog
        },
        props: {
            total: 0,
            data: Array,
            menu: {
                default:()=>{
                    return '';
                }
            },

            column: Array,
            option: {},
            addColumn:Array,

            url:'',
            where:{},
            myMethod:{
                default:()=>{
                    return 'getData';
                }
            },
            vuexMethod: '',
        },
        watch: {
            total(to) {
                this.page.total = to;
            },
            data(to) {
                this.TableData = to;
            }
        },
        computed: {
            ...mapGetters(['CurrentMenu']),
            tableOption() {
                let option={
                    addBtn: false,
                    editBtn:false,
                    delBtn:false,
                    menu: false,
                    align: 'center',
                    menuAlign: 'center',
                    selection: true,
                    selectOnClickRow:true,
                    column: []
                }

                if (this.column.length > 0) option.column = this.column;

                Object.assign(option,this.option);

                let column=[];
                this.condition={};
                for(let i in option.column){
                    let item=option.column[i];
                    if(!item.editDisplay){
                        column.push(item)
                    }

                    if(typeof item.searchDefault!=="undefined"){
                        this.condition[item.prop]=item.searchDefault;
                    }
                }

                if(this.addColumn && this.addColumn.length){
                    this.dialogOption.column=column.concat(this.addColumn)
                }else{
                    this.dialogOption.column=column;
                }

                return option;
            },
        },
        data() {
            return {
                loading: false,
                dialogFormVisible: false,
                TableData:[],
                page: {
                    currentPage:1,
                    pageSize: 15,
                    pageSizes: [15, 30, 45, 60]
                },
                CurrentEvent: '',
                dialogOption: {
                    title: '',
                    menuBtn: false,
                    column: []
                },

                TableMenu:[],
                selected:[],

                condition:{},

                EditObject:{}
            }
        },
        mounted(){
          this.$nextTick(function () {
              if(this.menu){
                  if(this.menu.length===0){
                      this.GetTableMenu();
                  }else{
                      this.TableMenu=this.menu;
                  }
              }
          })
        },

        methods: {
            onLoad(page) {
                if(page) this.page=page;
                if(this.$refs.table){
                    this.$refs.table.selectClear();
                }

                let params = Object.assign({
                    page: this.page.currentPage,
                    rows: this.page.pageSize
                },this.condition,this.where);

                if(this.url){
                    this.getDataMyself(params);
                }else if(this.vuexMethod){
                    this.getData(params);
                }else{
                    this.$emit(this.myMethod, params)
                }
            },
            //根据vuex的方法获取数据
            getData(params) {
                this.loading = true;

                this.$store.dispatch(this.vuexMethod, params).then(res => {
                        this.loading = false;
                        this.page.total = res.data.total;
                        this.TableData = res.data.list;
                })
            },
            //根据url获取数据
            getDataMyself(params){
                this.loading = true;

                return ajax({
                    url: this.url,
                    method: 'post',
                    data: params
                }).then(res=>{
                    this.loading = false;
                    this.page.total = res.data.total;
                    this.TableData = res.data.list;
                }).catch(()=>{})

            },
            //搜索
            SearchChange(params){
                this.page.currentPage=1;
                this.condition=params;
                this.onLoad();
            },
            //刷新
            refreshChange() {
                this.onLoad();
            },
            //选中/取消
            selectionChange(list){
                this.selected=list;
            },
            //单击行
            RowClick(row){
                if(this.tableOption.selectOnClickRow){
                    this.$refs.table.toggleRowSelection(row);
                }
            },

            hideDialog(flag){
                this.dialogFormVisible=false;

                flag && this.refreshChange();
            },
            //判断执行方法
            handler(btn) {
                let table=this.$refs.table;
                this.CurrentEvent = btn.jsMethodName;

                if(btn.selectDataNum){
                    if(btn.selectDataNum===1 && this.selected.length!==1){
                        this.$message({
                            message: `请选择1条数据！`,
                            type: "warning"
                        });
                        return ;
                    }
                    if(btn.selectDataNum===2 && this.selected.length===0){
                        this.$message({
                            message: `至少选择1条数据！`,
                            type: "warning"
                        });
                        return ;
                    }

                    this.EditObject=this.selected[0];
                }else{
                    this.EditObject={};
                }

                if (btn.isDialog) {

                    this.dialogFormVisible = true;
                    this.dialogOption.title=btn.name;
                    this.dialogOption.sure=btn.callback;

                }else if(btn.callback){
                    btn.callback(this.selected,table);
                } else {
                    this.$emit(btn.jsMethodName,{selected:this.selected,table:table});
                }
            },

            //获取表格按钮
            GetTableMenu(){
                GetMenuById(this.CurrentMenu.menuId).then(res=>{
                   this.TableMenu=res.data;
                });
            },

            //改变表格显示条数
            sizeChange(value){
                this.page.currentPage = 1;
                this.page.pageSize=value;
                this.onLoad();
            },
            //改变表格页数
            currentChange(value){
                this.page.currentPage = value;
                this.onLoad();
            }
        }
    }
</script>

<style scoped>
</style>
