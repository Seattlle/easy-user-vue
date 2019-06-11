<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="loginName">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="loginForm.loginName"
                auto-complete="off"
                placeholder="请输入用户名">
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="loginPwd">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="loginForm.loginPwd"
                auto-complete="off"
                placeholder="请输入密码">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="verifyCode">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    :maxlength="code.len"
                    v-model="loginForm.verifyCode"
                    auto-complete="off"
                    placeholder="请输入验证码">
            <i slot="prefix" class="icon-yanzhengma"></i>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"/>
          </div>
        </el-col>
      </el-row>

    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { GetUUID } from '@/util/util'
import { mapGetters } from "vuex";
export default {
  name: "userlogin",
  data () {
    return {
      loginForm: {
        machineId:'',
        loginName: "",
        loginPwd: "",
        verifyCode: "",
      },
      checked: false,
      code: {
        src: "",
        value: "",
        len: 4
      },
      loginRules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        loginPwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" }
        ]
      },
      passwordType: "password"
    };
  },
  created () {
    this.refreshCode();
  },
  mounted () {
  },
  computed: {
    ...mapGetters(["tagWel","website"])
  },
  props: [],
  methods: {
    refreshCode () {
      this.loginForm.verifyCode='';
      this.loginForm.machineId=GetUUID();
      this.code.src=this.website.RequestHeaders.user+'/sys/user/verifyCode'
              + '?isNum=1'
              + '&machineId=' + this.loginForm.machineId
              + '&v=' + (+new Date());
    },
    showPassword () {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
            this.$router.push({ path: this.tagWel.value });
          })
        }
      });
    }
  }
};
</script>

<style>
</style>
