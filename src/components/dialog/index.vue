<template>
    <el-dialog :title="option.title" :visible.sync="show" :before-close="cancel">
        <avue-form ref="dialogForm" v-model="obj" :option="option" ></avue-form>

        <div slot="footer" class="dialog-footer">
            <el-button v-for="(item,index) in dialogBtn"
                       :key="index"
                       v-text="item.label"
                       :type="item.type ||''"
                       @click="handler(item)">
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "index",
        props:{
            show:false,
            option:{
                default:function () {
                    return {
                        title:''
                    }
                }
            },
            btn:{
                default:()=>{
                    return []
                }
            },
            CurrentMethod:'',
            selected:{}
        },
        watch:{
            show(){
               this.obj=this.selected ||{};
           }
        },
        computed:{
            dialogBtn(){
                return [{
                    label:'取消',
                    method:'cancel'
                },{
                    label:'确定',
                    method:'SureMethod',
                    type:'primary'
                }].concat(this.btn)
            }
        },
        data(){
            return {
                obj:{}
            }
        },
        methods:{
            handler(btn){
                if(typeof this[btn.method]==="function"){
                    this[btn.method]();
                }else{
                    this.$emit(btn.method,this.obj);
                }
            },
            cancel(done,flag){
                this.$refs.dialogForm.resetForm();
                this.$emit('hideDialog',flag);
            },
            SureMethod(){
                this.$refs.dialogForm.validate(valid=>{
                    if(valid){
                        if(this.option.sure){
                            this.option.sure(this.obj).then((flag)=>{
                                flag && this.cancel()
                            });
                        }else{
                            this.$store.dispatch(this.CurrentMethod, this.obj).then((flag) => {
                                flag && this.cancel({},true);
                            })
                        }
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>
