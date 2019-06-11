<template>
    <div>
        <basic-container>
            <el-container>
                <el-aside width="300px">
                    <el-main>
                        <el-header class="menu-header">
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
                        </el-header>

                        <el-main>
                            <avue-crud
                                    ref="singleTable"
                                    :data="Role"
                                    :option="RoleBtnOption"
                                    @current-row-change="handleCurrentChange">
                            </avue-crud>
                        </el-main>

                    </el-main>
                </el-aside>
                <el-container>
                    <el-main>
                        <div class="head">
                            <div class="left">
                                <h4 class="title" v-text="'选中角色：'+CurrentRole.name"></h4>
                            </div>
                            <div class="buttons">
                                <el-button @click="SaveRoleSetting" type="primary" size="small" round>保存</el-button>
                            </div>
                        </div>


                        <el-tree :data="menu"
                                 node-key="menuId"
                                 show-checkbox
                                 ref="tree"
                                 default-expand-all
                                 :expand-on-click-node="false"
                                 @node-click="handleNodeClick">
                        </el-tree>


                    </el-main>
                </el-container>
            </el-container>
        </basic-container>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {validatenull} from "@/util/validate";
    import {findParent} from "@/util/util";
    import {GetSystemMenu} from "@/api/menu";
    import {GetAllRoles,SaveSetting,GetRolesMenu} from "@/api/role";

    export default {
        name: "menu",
        components: {},
        data() {
            return {
                Role: [],
                RoleBtnOption: {
                    addBtn: false,
                    menu: false,
                    refreshBtn: false,
                    header: false,
                    highlightCurrentRow:true,
                    column: [
                        {
                            label: '角色名称',
                            prop: 'name'
                        }, {
                            label: '备注',
                            prop: 'remark'
                        }
                    ]
                },

                menu: [],
                system: [],
                ChosedSystem: '',
                CurrentRole: {name:''},
                ButtonKeys:{}
            }
        },
        created() {
            this.$store.dispatch("getAllSystem").then((data) => {
                this.system = data;
            });
            this.GetAllRole();
        },
        computed: {
            ...mapGetters(["permission"]),
        },
        props: [],
        methods: {
            handleNodeClick(){

            },
            changeSystem(value) {
                GetSystemMenu(value).then(res => {
                    let menu=res.data;

                    this.ButtonKeys={};

                    let initData=(data)=>{
                        let children=data.children||[];

                        this.ButtonKeys[data.menuId]=data.buttons?data.buttons.length:0;

                        for(let i in data.buttons){
                            let item=data.buttons[i],
                                obj={};

                            obj.children=[];
                            obj.buttons=[];
                            obj.label=item.name;
                            obj.menuId=item.buttonId;
                            obj.buttonId=item.buttonId;
                            children.push(obj);
                        }

                        data.children=children;

                        for(let i in children){
                            initData(children[i]);
                        }
                    }

                    for(let i in menu){
                        initData(menu[i]);
                    }

                    this.menu = menu;
                    this.$refs.tree.setCheckedKeys([]);
                    this.$refs.singleTable.setCurrentRow(0);
                })
            },
            GetAllRole() {
                let params = {
                    page: 1,
                    rows: 20
                }

                GetAllRoles(params).then(res => {
                    this.Role = res.data.list;
                })
            },
            GetRoleMenu(){
                if(!this.ChosedSystem){
                    this.$message({
                        showClose: true,
                        message: "请先选择系统！",
                        type: "warning"
                    })
                    return;
                }
                if(!this.CurrentRole.roleId){
                    this.$message({
                        showClose: true,
                        message: "请先选择角色！",
                        type: "warning"
                    })
                    return;
                }

                GetRolesMenu(this.CurrentRole.roleId,this.ChosedSystem).then(res=>{
                    let data=res.data,
                        selected=[];

                    for(let i in data){
                        let item=data[i];

                        if(this.ButtonKeys[item.menuId]===item.buttons.length){
                            selected.push(item.menuId);
                        }

                        for(let j in item.buttons){
                            selected.push(item.buttons[j].buttonId);
                        }
                    }

                    this.$refs.tree.setCheckedKeys(selected);

                })
            },
            handleCurrentChange(currentRow, oldCurrentRow){
                if(currentRow){
                    this.CurrentRole=currentRow;
                    this.GetRoleMenu();
                }else{
                    this.CurrentRole={name:''}
                }
            },
            SaveRoleSetting(){
                if(!this.ChosedSystem){
                    this.$message({
                        showClose: true,
                        message: "请先选择系统！",
                        type: "warning"
                    })
                    return;
                }
                if(!this.CurrentRole.roleId){
                    this.$message({
                        showClose: true,
                        message: "请先选择角色！",
                        type: "warning"
                    })
                    return;
                }

               let selected=this.$refs.tree.getCheckedNodes(),
                   _menuIds=[],
                   _buttonIds=[];

               for(let i in selected){
                   if(selected[i].buttonId){
                       _buttonIds.push(selected[i].buttonId);
                   }else{
                       _menuIds.push(selected[i].menuId)
                   }
               }

               let obj={
                   roleId:this.CurrentRole.roleId,
                   belongSys:this.ChosedSystem,
                   menuIds:_menuIds.join(';'),
                   buttonIds:_buttonIds.join(';')
               }

                SaveSetting(obj).then(res=>{
                    this.$message({
                        showClose: true,
                        message: "保存成功",
                        type: "success",
                        onClose:()=>{

                        }
                    })
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .menu-container {
        padding: 0 20px;
    }

    .head{
        display: flex;
        justify-content:space-between;
        align-items: baseline;

        .title{
            padding-bottom:15px;
        }

        .buttons{
        }
    }



</style>
